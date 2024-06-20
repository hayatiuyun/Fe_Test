
import DashboardComponent from "@/components/Dashboard";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { getUnits } from "@/services/Unit";
import { UnitData } from "types";

export async function getServerUnits() {
  const response = await getUnits();
  let responseData: any = {
    dataBarChart: { series: [], xAxis: { categories: [] } },
    dataPieChart: { series: [] },
  };
  if (response?.data?.status) {
    const data: UnitData[] = response.data?.data;
    const dataBarChart = data.map((unit) => unit.ruas.length);
    const dataPieChart = data.map((unit) => ({
      name: unit.unit,
      y: unit.ruas.length,
    }));
    responseData["dataBarChart"] = {
      series: [{ name: "Ruas", data: dataBarChart }],
      xAxis: { categories: data.map((unit) => unit.unit) },
    };

    responseData["dataPieChart"] = {
      series: [{data: dataPieChart, name: "Unit Kerja", colorByPoint: true}],
    };

    responseData["data"] = data.map(unit => ({
      id: unit.id,
      ruas: unit.ruas.map(r => r.ruas_name).join(', '), // Join ruas names if multiple
      km_awal: unit.ruas.length > 0 ? unit.ruas[0].km_awal : '',
      km_akhir: unit.ruas.length > 0 ? unit.ruas[0].km_akhir : '',
      photo_url: unit.ruas.length > 0 ? unit.ruas[0].photo_url : '',
      doc_url: unit.ruas.length > 0 ? unit.ruas[0].doc_url : '',
      long: unit.ruas.length > 0 ? unit.ruas[0].long : 0,
      unit: unit.unit,
      status: unit.status,
    }))
  }

  return responseData;
}
const DashboardPage = async () => {
  const units = await getServerUnits();
  console.log(units);
    return (
      <DashboardLayout title="Dashboard">
        <DashboardComponent units={units} />
      </DashboardLayout>
    );
  };
  
  export default DashboardPage;
  