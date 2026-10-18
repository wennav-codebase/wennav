import React from 'react'

export function CtaPrimary({children}: {children: React.ReactNode}) {
  return (
  <button className="relative isolate overflow-hidden bg-accent text-secondary px-4 py-2 rounded-3xl transition-colors duration-300 hover:text-accent before:absolute before:inset-0 before:-z-10 before:translate-y-full before:rounded-[inherit] before:bg-secondary/90 before:transition-transform before:duration-300 before:ease-in-out hover:before:translate-y-0">
  {children}
</button>
  );
}

export function CtaSecondary({children}: {children: React.ReactNode}) {
  return (
    <button
        className="
        "
    >{children}</button>
  )
}

