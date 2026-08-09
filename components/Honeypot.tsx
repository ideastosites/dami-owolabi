"use client";

import { useEffect, useRef } from "react";

// Two fields, always used together:
// - `name` (default "website"): a field real visitors never see or fill in
//   (hidden off-screen, not display:none, since some bots skip those).
//   Bots that scrape a form and fill every field blind fill this too.
// - `formRenderedAt`: a hidden timestamp set once the form actually mounts.
//   A submission that arrives faster than a human could plausibly fill the
//   form is almost certainly scripted. Set via a DOM ref rather than React
//   state/props so the timestamp never has to flow through a render — forms
//   read it back the same way they already read the honeypot, via
//   `new FormData(formEl).get(...)` in their submit handler.
export default function Honeypot({ name = "website" }: { name?: string }) {
  const timeInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (timeInputRef.current) {
      timeInputRef.current.value = String(Date.now());
    }
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "-5000px",
        width: "1px",
        height: "1px",
        overflow: "hidden",
      }}
    >
      <label htmlFor={name}>Leave this field blank</label>
      <input type="text" id={name} name={name} tabIndex={-1} autoComplete="off" />
      <input type="hidden" name="formRenderedAt" ref={timeInputRef} defaultValue="" />
    </div>
  );
}
