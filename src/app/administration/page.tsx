import { Suspense } from "react";
import { AdminDashboardContent } from "@/components/admin/AdminDashboardContent";
import { LoadingState } from "@/components/LoadingState";

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Painel de Administração</h1>
      <Suspense fallback={<LoadingState />}>
        <AdminDashboardContent />
      </Suspense>
    </div>
  );
}