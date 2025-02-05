// components/HydrateWrapper.tsx
"use client";

import React from "react";
import { Hydrate } from "react-query";

export default function HydrateWrapper({
  children,
  state,
}: {
  children: React.ReactNode;
  state: unknown;
}) {
  return <Hydrate state={state}>{children}</Hydrate>;
}
