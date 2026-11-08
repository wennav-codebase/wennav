"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";

const { Engine, Runner, Bodies, Body, Composite, Constraint, Events, Vector } =
  Matter;

const CAPSULE_H = 36;
const SPAWN_EVERY_MS = 400;
const SETTLE_FRAMES = 45;
const WALL_THICKNESS = 50;
// A new capsule only drops once existing ones have fallen below this line
const SPAWN_ZONE_Y = CAPSULE_H * 3;

const LABELS = ["Web Development", "Mobile Apps", "SaaS", "UI/UX", "Brand Kit"];

// Full class names so Tailwind can detect them
const VARIANTS = [
  "bg-primaryLight text-secondary",
  "bg-primary text-secondary border border-secondary/20",
  "bg-accent text-secondary",
  "bg-secondary text-primary",
];

type Spec = { label: string; variant: string };

type Capsule = {
  body: Matter.Body;
  el: HTMLDivElement;
  width: number;
  calmFrames: number;
};

function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function FallingCapsules({
  className = "",
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup: (() => void) | undefined;

    const start = (width: number, height: number) => {
      const engine = Engine.create({ gravity: { x: 0, y: 1, scale: 0.001 } });
      const runner = Runner.create();
      const capsules: Capsule[] = [];

      // Every label is used once. Variants are dealt round-robin so all appear.
      const labels = shuffle(LABELS);
      const variants = shuffle(VARIANTS);
      const queue: Spec[] = labels.map((label, i) => ({
        label,
        variant: variants[i % variants.length],
      }));

      // Drag state
      let dragged: Capsule | null = null;
      let dragConstraint: Matter.Constraint | null = null;

      // Floor, ceiling and side walls. They are bouncy so thrown capsules
      // rebound off them and fall back down.
      const boundary = (x: number, y: number, w: number, h: number) =>
        Bodies.rectangle(x, y, w, h, {
          isStatic: true,
          restitution: 0.4,
          friction: 0.3,
        });

      Composite.add(engine.world, [
        boundary(
          width / 2,
          height + WALL_THICKNESS / 2,
          width + 200,
          WALL_THICKNESS,
        ), // floor
        boundary(width / 2, -WALL_THICKNESS / 2, width + 200, WALL_THICKNESS), // ceiling
        boundary(-WALL_THICKNESS / 2, height / 2, WALL_THICKNESS, height * 3), // left
        boundary(
          width + WALL_THICKNESS / 2,
          height / 2,
          WALL_THICKNESS,
          height * 3,
        ), // right
      ]);

      const createCapsule = ({ label, variant }: Spec) => {
        const el = document.createElement("div");
        el.dataset.capsule = "";
        el.className = `absolute left-0 top-0 flex items-center justify-center whitespace-nowrap rounded-full px-5 text-sm font-semibold shadow-lg pointer-events-auto touch-none select-none cursor-grab active:cursor-grabbing ${variant}`;
        el.style.height = `${CAPSULE_H}px`;
        el.style.willChange = "transform";
        el.textContent = label;
        container.appendChild(el);

        // Measure rendered width and use it for the physics body
        const w = el.offsetWidth;

        // Small tilt at spawn so the capsule stays inside the ceiling
        const angle = Math.random() * 0.6 - 0.3;
        const halfExtent =
          (w / 2) * Math.abs(Math.sin(angle)) +
          (CAPSULE_H / 2) * Math.abs(Math.cos(angle));

        const x = w / 2 + Math.random() * Math.max(width - w, 0);
        const y = halfExtent + 2; // just below the ceiling

        const body = Bodies.rectangle(x, y, w, CAPSULE_H, {
          chamfer: { radius: CAPSULE_H / 2 },
          restitution: 0.3,
          friction: 0.6,
          frictionAir: 0.01,
          density: 0.002,
          angle,
        });

        Composite.add(engine.world, body);
        capsules.push({ body, el, width: w, calmFrames: 0 });
      };

      // Only drop the next capsule when the spawn area is empty
      const isSpawnClear = () =>
        capsules.every((c) => c.body.position.y > SPAWN_ZONE_Y);

      const spawnNext = () => {
        if (queue.length === 0) {
          window.clearInterval(timer);
          return;
        }
        if (!isSpawnClear()) return;
        createCapsule(queue.shift()!);
      };

      // Pointer position relative to the container, clamped to its bounds
      const getLocalPoint = (e: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        return {
          x: Math.min(Math.max(e.clientX - rect.left, 0), width),
          y: Math.min(Math.max(e.clientY - rect.top, 0), height),
        };
      };

      const onPointerDown = (e: PointerEvent) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;

        const target = (e.target as HTMLElement).closest<HTMLElement>(
          "[data-capsule]",
        );
        const capsule = capsules.find((c) => c.el === target);
        if (!capsule) return;

        const body = capsule.body;
        const p = getLocalPoint(e);

        // Wake up a capsule that was frozen so it can move again
        if (body.isStatic) Body.setStatic(body, false);
        capsule.calmFrames = 0;

        // Grab point in the body's local space, so grabbing any part works
        const local = Vector.rotate(Vector.sub(p, body.position), -body.angle);

        const constraint = Constraint.create({
          pointA: { x: p.x, y: p.y },
          bodyB: body,
          pointB: { x: local.x, y: local.y },
          stiffness: 0.2,
          damping: 0.1,
          length: 0.01,
        });

        Composite.add(engine.world, constraint);
        dragged = capsule;
        dragConstraint = constraint;
        capsule.el.setPointerCapture(e.pointerId);
      };

      const onPointerMove = (e: PointerEvent) => {
        if (!dragConstraint) return;
        dragConstraint.pointA = getLocalPoint(e);
      };

      const onPointerUp = () => {
        if (!dragged || !dragConstraint) return;
        Composite.remove(engine.world, dragConstraint);
        dragged.calmFrames = 0; // let it settle and freeze again
        dragged = null;
        dragConstraint = null;
      };

      // Sync DOM with physics and freeze capsules that have settled
      const handleUpdate = () => {
        for (const c of capsules) {
          const { position, angle } = c.body;

          // Never freeze the capsule currently being dragged
          if (!c.body.isStatic && c !== dragged) {
            const calm =
              c.body.speed < 0.15 && Math.abs(c.body.angularSpeed) < 0.01;
            c.calmFrames = calm ? c.calmFrames + 1 : 0;

            if (c.calmFrames > SETTLE_FRAMES) {
              Body.setStatic(c.body, true);
            }
          }

          c.el.style.transform = `translate(${position.x - c.width / 2}px, ${
            position.y - CAPSULE_H / 2
          }px) rotate(${angle}rad)`;
        }
      };

      container.addEventListener("pointerdown", onPointerDown);
      container.addEventListener("pointermove", onPointerMove);
      container.addEventListener("pointerup", onPointerUp);
      container.addEventListener("pointercancel", onPointerUp);

      Events.on(engine, "afterUpdate", handleUpdate);
      Runner.run(runner, engine);

      const timer = window.setInterval(spawnNext, SPAWN_EVERY_MS);
      spawnNext();

      return () => {
        window.clearInterval(timer);
        container.removeEventListener("pointerdown", onPointerDown);
        container.removeEventListener("pointermove", onPointerMove);
        container.removeEventListener("pointerup", onPointerUp);
        container.removeEventListener("pointercancel", onPointerUp);
        Events.off(engine, "afterUpdate", handleUpdate);
        Runner.stop(runner);
        Engine.clear(engine);
        capsules.forEach((c) => c.el.remove());
      };
    };

    // Start only once the container has a real size
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0 && !cleanup) {
        cleanup = start(width, height);
      }
    });
    ro.observe(container);

    return () => {
      ro.disconnect();
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[220px] mt-24 overflow-hidden z-20 pointer-events-none ${className}`}
    />
  );
}
