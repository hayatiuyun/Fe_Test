import React, { Suspense } from "react";
import BarChart from "../ChartWrapper/BarChart";
import PieChart from "../ChartWrapper/PieChart";
import { Skeleton } from "@mui/material";
import RoutesData from "./RoutesData";

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

interface DashboardProps {
  units: {
    data: UnitData[];
    dataBarChart: { series: any[]; xAxis: { categories: string[] } };
    dataPieChart: { series: any[] };
  };
}

const DashboardComponent = async ({ units }: DashboardProps) => {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex flex-wrap gap-5 ">
        <div className="w-full lg:w-[49%]">
          <div className="bg-white border shadow-sm rounded-lg p-5 border-primary-700/5">
            <Suspense fallback={<Skeleton width={50} height={50} />}>
              <BarChart
                series={units.dataBarChart.series}
                xAxis={units.dataBarChart.xAxis}
              />
            </Suspense>
          </div>
        </div>
        <div className="w-full lg:w-[49%]">
          <div className="bg-white border shadow-sm rounded-lg p-5 border-primary-700/5">
            <Suspense fallback={<Skeleton width={50} height={50} />}>
              <PieChart series={units.dataPieChart.series} />
            </Suspense>
          </div>
        </div>
      </div>
      <RoutesData rows={units?.data} />
    </div>
  );
};

export default DashboardComponent;
