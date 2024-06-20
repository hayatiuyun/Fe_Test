import React from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import MasterDataComponent from "@/components/MasterData";
import { getAllRuas } from "@/services/Ruas";
import { RuasData, UnitData } from "types";
import { getServerUnits } from "../dashboard/page";

async function getMasterData(query: string, page: number) {
    // console.log("GET QUERY <<>>", query, page);
    
    const response = await getAllRuas({ page });
    // console.log(response.data);
    
    let data: RuasData[] = [];
    let total: number = 0;
    // Fetch data from API
    if (response.status === 200) {
      let dataResponse: RuasData[] = response.data?.data;
    //   console.log("dataResponse Master <<>>", response);
  
      data = dataResponse.filter(ruas => ruas.ruas_name?.toLowerCase().includes(query.toLowerCase())).map(ruas => ({
        id: ruas.id,
        ruas: ruas.ruas_name,
        km_awal: ruas.km_awal,
        km_akhir: ruas.km_akhir,
        photo_url: ruas.photo_url,
        doc_url: ruas.doc_url,
        unit: ruas.unit_id,
        status: ruas.status,
      }));
  
    //   console.log("dataResponse Master <<>>", data);
      
  
      total = response.data?.last_page;
  
    }
    return {
      data,
      total,
    };
  }
const MasterDataPage = async (
    {
        searchParams,
      }: {
        searchParams?: {
          query?: string;
          page?: string;
        };
      }
) => {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page ?? 1);
    const { data, total } = await getMasterData(query, currentPage);
    const units = await getServerUnits();

    console.log("query", data, total, searchParams); 
  return (
    <DashboardLayout title="Master Data">
      <MasterDataComponent units={units.data} data={data} total={total} currentPage={currentPage} query={query} />
    </DashboardLayout>
  );
};

export default MasterDataPage;
