"use client";

import React from "react";
import { HydrationBoundary } from "@tanstack/react-query";

export default function HydrateWrapper({
  children,
  state,
}: {
  children: React.ReactNode;
  state: unknown;
}) {
  return <HydrationBoundary state={state}>{children}</HydrationBoundary>;
}
