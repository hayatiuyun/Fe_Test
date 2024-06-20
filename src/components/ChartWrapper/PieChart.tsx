"use client";
import React, { useMemo } from 'react';
import Highcharts, { Options, SeriesPieOptions } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface ChartProps {
  series: SeriesPieOptions[]; // Use SeriesPieOptions[] for pie chart series
}

const PieChart = ({ series }: ChartProps) => {

  // Memoize the options creation to prevent unnecessary recalculations
  const options: Options = useMemo(
    () => ({
      chart: {
        type: 'pie',
      },
      title: {
        text: 'Unit Kerja',
      },
      series,
      credits: {
        enabled: false,
      },
    }),
    [series]
  );
  
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
};

export default PieChart;
