"use client";
import React, { Suspense, useState } from "react";
import { Button } from "@mui/material";
import Search from "./Search";
import TableMasterData from "./Table";
import { RuasData, UnitData } from "types";
import { AddBoxRounded, PlusOneRounded } from "@mui/icons-material";
import FormMasterData from "./Form";
import { revalidatePath } from "next/cache";
import { deleteRuas } from "@/services/Ruas";
import ModalDelete from "./ModalDelete";

interface MasterDataProps {
  data: RuasData[];
  total: number;
  currentPage: number;
  query: string;
  units: [];
}


const MasterDataComponent = ({
  data,
  total,
  currentPage,
  query,
  units,
}: MasterDataProps) => {
  const [modalForm, setModalForm] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<any>(undefined) ;
  const [isView, setIsView] = useState<boolean>(false)

  const [modalDeleteBool, setModalDeleteBool] = useState<boolean>(false)

  const handleOpenModal = () => {
    setModalForm(true);
  };

  const handleCloseModal = () => {
    setModalForm(false);
  };

  const handleSelectData = (data: any) => {
    setIsView(false)
    setSelectedData(data);
  };

  const handleIsViewMode = () => {
    setIsView(true);
  }

  const handleDelete = async () => {
    await deleteRuas(selectedData)
    revalidatePath("/master-data")
  }

  const handleOpenModalDelete = () => {
    setModalDeleteBool(true)
  }
  const handleCloseModalDelete = () => {
    setModalDeleteBool(false)
  }

  return (
    <div className="flex flex-col gap-4">
      {modalForm ? (
        <FormMasterData
          isOpen={modalForm}
          onClose={handleCloseModal}
          units={units}
          values={selectedData}
          isView={isView}
        />
      ) : null}
      <ModalDelete
      isOpen={modalDeleteBool}
      onClose={handleCloseModalDelete}
      id={selectedData}
      onDelete={handleDelete}
      />

      <div className="flex flex-wrap gap-4 items-center ">
        <Search />
        <Button
          variant="contained"
          onClick={() => {
            setSelectedData(undefined)
            handleOpenModal()
          }}
          startIcon={<AddBoxRounded />}
        >
          Add Data
        </Button>
      </div>
      <Suspense
        key={`table-${query}-${currentPage}`}
        fallback={<div>Loading...</div>}
      >
        <TableMasterData
          data={data}
          total={total}
          page={currentPage}
          onSelectDataEdit={handleSelectData}
          onOpenModalForm={handleOpenModal}
          onOpenViewMode={handleIsViewMode}
          onOpenDeleteModal={handleOpenModalDelete}
        />
      </Suspense>
    </div>
  );
};

export default MasterDataComponent;
