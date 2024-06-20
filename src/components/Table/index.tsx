// ModularTable.tsx
"use client";
import React, { useState } from "react";
import {
  DataGrid,
  GridColDef,
  gridPageCountSelector,
  GridPagination,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import type {} from "@mui/x-data-grid/themeAugmentation";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import {
  DeleteOutlineRounded,
  EditNoteRounded,
  RemoveRedEyeRounded,
} from "@mui/icons-material";
import MuiPagination from "@mui/material/Pagination";
import { TablePaginationProps } from "@mui/material/TablePagination";

interface TableProps {
  columns: GridColDef[];
  rows: any[];
  pagination?: boolean;
  pageSizeOptions?: number;
  pageSize: number;

  withActions?: boolean;
  withPagination?: boolean;
  footer?: React.FC | null;

  onSelectDataEdit?: (data: any) => void;
  onOpenModalForm?: () => void;
  onOpenViewMode?: () => void;
  onOpenDeleteModal?: () => void;
}

interface ModalPhotoProps {
  open: boolean;
  onClose: () => void;
  url: string;
}

function Pagination({
  page,
  onPageChange,
  className,
}: Pick<TablePaginationProps, "page" | "onPageChange" | "className">) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount}
      page={page + 1}
      variant="outlined"
      shape="rounded"
      onChange={(event, newPage) => {
        onPageChange(event as any, newPage - 1);
      }}
    />
  );
}

function CustomPagination(props: any) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

const ModalPhoto = ({ open, onClose, url }: ModalPhotoProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Photo</DialogTitle>
      <DialogContent>
        <img
          src={`https://placehold.co/600x400?text=${url}`}
          width={1280}
          height={1280}
          alt="photo"
          className="w-full"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

const Table: React.FC<TableProps> = ({
  rows,
  pageSize = 5,
  withActions = false,
  withPagination = true,
  footer = null,
  onSelectDataEdit = () => {},
  onOpenModalForm = () => {},
  onOpenViewMode = () => {},
  onOpenDeleteModal = () => {},
}) => {
  const [openPhotoModal, setOpenPhotoModal] = useState<boolean>(false);
  const [currentPhotoUrl, setCurrentPhotoUrl] = useState<string>("");

  const onOpenModal = (url: string) => {
    setCurrentPhotoUrl(url);
    setOpenPhotoModal(true);
  };

  const handleEdit = (rowData: any, isView: boolean) => {
    console.log(rowData);

    onSelectDataEdit(rowData.id);
    if (isView) onOpenViewMode();
    onOpenModalForm();
  };

  const defaultColumns: GridColDef[] = [
    {
      field: "id",
      headerName: "No",
      width: 120,
      cellClassName: "!whitespace-normal text-center",
      headerClassName: "!whitespace-normal text-center",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "ruas",
      headerName: "Routes",
      width: 200,
      cellClassName: "!whitespace-normal text-center",
      headerClassName: "!whitespace-normal text-center",
      align: "center",
      headerAlign: "center",
    },

    {
      field: "lokasi",
      headerName: "Location",
      width: 200,
      cellClassName: "!whitespace-normal text-center",
      headerClassName: "!whitespace-normal text-center",
      align: "center",
      headerAlign: "center",

      valueGetter: (params, row) =>
        `${row.km_awal} s/d ${row.km_akhir} (${row.long} km)`,
    },
    {
      field: "foto",
      headerName: "Photo",
      width: 120,
      cellClassName: "!whitespace-normal text-center",
      headerClassName: "!whitespace-normal text-center",
      align: "center",
      headerAlign: "center",

      renderCell: (params) => (
        <div>
          <Button onClick={() => onOpenModal(params.row.photo_url)}>
            View
          </Button>
        </div>
      ),
    },
    {
      field: "document",
      headerName: "Document",
      width: 150,
      cellClassName: "!whitespace-normal text-center",
      headerClassName: "!whitespace-normal text-center",
      align: "center",
      headerAlign: "center",

      renderCell: (params) => (
        <a
          className="text-blue-500 hover:underline cursor-pointer"
          href={params.row.doc_url}
          download
        >
          Download
        </a>
      ),
    },
    {
      field: "unit",
      headerName: "Work Unit",
      width: 250,

      cellClassName: "!whitespace-normal text-center",
      headerClassName: "!whitespace-normal text-center",
      align: "center",
      headerAlign: "center",
    },

    {
      field: "status",
      headerName: "Status",
      width: 120,
      cellClassName: "!whitespace-normal text-center",
      headerClassName: "!whitespace-normal text-center",
      align: "center",
      headerAlign: "center",

      renderCell: (params) => (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            params.value === 1
              ? "bg-success-50 text-success-600"
              : "bg-error-50 text-error-600"
          }`}
        >
          {params.value === 1 ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  const actionColumn: GridColDef = {
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
    renderCell: ({ row }) => (
      <div>
        <IconButton onClick={() => handleEdit(row, false)}>
          <EditNoteRounded />
        </IconButton>
        <IconButton onClick={() => handleEdit(row, true)}>
          <RemoveRedEyeRounded />
        </IconButton>
        <IconButton
          onClick={() => {
            onSelectDataEdit(row.id);
            onOpenDeleteModal();
          }}
        >
          <DeleteOutlineRounded />
        </IconButton>
      </div>
    ),
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-full">
        <ModalPhoto
          open={openPhotoModal}
          onClose={() => setOpenPhotoModal(false)}
          url={currentPhotoUrl}
        />
      </div>
      <DataGrid
        rows={rows}
        columns={
          withActions ? [...defaultColumns, actionColumn] : defaultColumns
        }
        slots={{
          pagination: CustomPagination,
          ...(footer && { footer }),
        }}
        sortingOrder={["asc", "desc"]}
        {...(withPagination
          ? {
              initialState: {
                pagination: {
                  paginationModel: { pageSize },
                },
              },
              pageSizeOptions: [5, 10, 20],
            }
          : {
              hideFooterPagination: true,
              hideFooterRowCount: true,
            })}
        autoHeight
        disableColumnFilter
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default Table;
