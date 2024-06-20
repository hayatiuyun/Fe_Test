"use client";
import React from "react";
import Table from "../Table";
import { GridColDef, GridSortModel } from "@mui/x-data-grid";
import { Button, IconButton, TextField } from "@mui/material";
import {
  DeleteTwoTone,
  EditNoteTwoTone,
  RemoveRedEyeTwoTone,
} from "@mui/icons-material";
import { RuasData } from "types";
import Pagination from "../Table/Pagination";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import MasterDataPagination from "./Pagination";

interface TableMasterDataProps {
  data: RuasData[];
  total: number;
  page: number;
  onSelectDataEdit?: (data: any) => void;
  onOpenModalForm?: () => void
  onOpenViewMode? : () => void
  onOpenDeleteModal? : () => void
}

const TableMasterData = ({ data, total, onSelectDataEdit, onOpenModalForm, onOpenViewMode, onOpenDeleteModal }: TableMasterDataProps) => {
  const columns: GridColDef[] = [
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 175,
      resizable: false,
      filterable: false,
      disableColumnMenu: true,
      disableReorder: true,
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: () => (
        <div>
          <IconButton>
            <EditNoteTwoTone />
          </IconButton>
          <IconButton>
            <RemoveRedEyeTwoTone />
          </IconButton>
          <IconButton>
            <DeleteTwoTone />
          </IconButton>
        </div>
      ),
    },
  ];

  const CustomFooterPagination = () =>  <MasterDataPagination total={total} />

  return (
    <div>
      <Table
        pageSize={5}
        columns={columns}
        rows={data}
        withActions
        withPagination={false}
        footer={CustomFooterPagination}
        onSelectDataEdit={onSelectDataEdit}
        onOpenModalForm={onOpenModalForm}
        onOpenViewMode ={onOpenViewMode}
        onOpenDeleteModal={onOpenDeleteModal}
      />
    </div>
  );
};

export default TableMasterData;
