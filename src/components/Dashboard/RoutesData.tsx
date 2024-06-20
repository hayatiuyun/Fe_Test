"use client";
import React, { useState } from "react";
import Table from "../Table";


interface UnitData {
  id: number;
  ruas: string;
  km_awal: string;
  km_akhir: string;
  photo_url: string;
  doc_url: string;
  unit: string;
  status: string;
}

interface RoutesDataProps {
  rows: UnitData[];
}

const RoutesData = ({ rows }: RoutesDataProps) => {

  return (
    <div>
        <Table columns={[]} pageSize={5} rows={rows} />
    </div>
  );
};

export default RoutesData;
