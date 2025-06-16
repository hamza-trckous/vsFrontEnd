// types/next.d.ts
/* eslint-disable */

import "next";

declare module "next" {
  export type PageProps<T = any> = {
    params: T;
    searchParams?: Record<string, string | string[]>;
  };
}
