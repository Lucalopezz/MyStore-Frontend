// Pagination.tsx (Filho)
"use client";

interface PaginationProps {
  meta: {
    page: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ meta, currentPage, onPageChange }: PaginationProps) {
  return (
    <div className="col-span-full mt-8 flex justify-center gap-4 items-center">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!meta.hasPreviousPage}
        className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
      >
        Anterior
      </button>

      <span className="text-white">
        Página {meta.page} de {meta.totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!meta.hasNextPage}
        className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
      >
        Próxima
      </button>
    </div>
  );
}