"use client";
import React, { useMemo } from "react";
import Highcharts, { Options, SeriesOptions } from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Define types for series data
interface SeriesData {
  name: string;
  data: number[];
}

interface ChartProps {
  series: SeriesData[];
  xAxis: { categories: string[] };
}

export const BarChart = ({ series, xAxis }: ChartProps) => {
  // Memoize the options creation to prevent unnecessary recalculations
  const options: Options = useMemo(
    () => ({
      chart: {
        type: "column",
      },
      title: {
        text: "Data Unit Kerja",
      },
      xAxis,
      yAxis: {
        min: 0,
        title: {
          text: "Jumlah Ruas",
        },
      },
      series: series.map((s) => ({
        type: "column", // Specify the type here as needed for your chart
        name: s.name,
        data: [...s.data], // Ensure data is copied to prevent mutation issues
      })),
      credits: {
        enabled: false,
      },
    }),
    [series, xAxis]
  );

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default BarChart;
