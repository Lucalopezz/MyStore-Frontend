"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { queryClient } from "@/hooks/useQueryClient";
import Header from "@/components/Header";
import { ToastProvider } from "@/providers/toast-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <Header />
        {children}
        <ToastProvider />
      </QueryClientProvider>
    </SessionProvider>
  );
}
