import React from 'react'

export function CtaPrimary({children}: {children: React.ReactNode}) {
  return (
  <button className="relative isolate overflow-hidden bg-accent text-secondary px-4 py-2 rounded-3xl transition-colors duration-300 hover:text-accent before:absolute before:inset-0 before:-z-10 before:translate-y-full before:rounded-[inherit] before:bg-secondary/90 before:transition-transform before:duration-500 before:ease-in-out hover:before:translate-y-0 cursor-pointer">
  {children}
</button>
  );
}

export function CtaSecondary({children}: {children: React.ReactNode}) {
  return (
    <button className="relative isolate overflow-hidden bg-secondaryLight/20 border border-white text-secondary px-4 py-2 rounded-3xl transition-colors duration-300 hover:text-secondary hover:border-accent before:absolute before:inset-0 before:-z-10 before:-translate-x-full before:rounded-[inherit] before:bg-accent/90 before:transition-transform before:duration-500 before:ease-in-out hover:before:translate-x-0 cursor-pointer">
      {children}
    </button>
  );
}

