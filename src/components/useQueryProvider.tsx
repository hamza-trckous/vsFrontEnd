"use client";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const useQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default useQueryProvider;
