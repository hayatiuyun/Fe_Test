"use client";
import React from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Pagination from "../Table/Pagination";

interface MasterDataPaginationProps {
  total: number;
}

const MasterDataPagination = ({ total = 0 }: MasterDataPaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const { replace } = useRouter();
  const createPageURL = (event: any, pageNumber: number) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams);
    const newPageNumber = pageNumber + 1;
    params.set("page", newPageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full flex justify-end py-3 p-5 border-t border-primary-700/5">
      <Pagination
        total={total}
        page={currentPage - 1}
        onPageChange={createPageURL}
      />
    </div>
  );
};

export default MasterDataPagination;
