"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { queryClient } from "@/hooks/useQueryClient";
import Header from "@/components/Header";
import { ToastProvider } from "@/providers/toast-provider";
import Footer from "@/components/Footer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <ToastProvider />
        <Footer />
      </div>
    </QueryClientProvider>
  </SessionProvider>
  );
}
