"use client";

import type { Ref } from "react";

export function Honeypot({ ref }: { ref: Ref<HTMLInputElement> }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
      <input
        type="text"
        name="_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        ref={ref}
        defaultValue=""
      />
    </div>
  );
}