import Image from "next/image";

function Loading() {
  return (
    <div className="relative h-screen w-screen hero-bg z-999">
      <Image
        src="/loading.gif"
        alt="Loading"
        fill
        className="object-contain"
        priority
        unoptimized
      />
    </div>
  );
}

export default Loading;
