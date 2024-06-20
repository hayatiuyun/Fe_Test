interface RuasData {
    id: number | undefined;
    unit_id?: number | undefined;
    ruas_name?: string | undefined;
    ruas?: string | undefined;
    long?: number | undefined;
    km_awal?: string | undefined;
    km_akhir?: string | undefined;
    photo_url?: string | undefined;
    doc_url?: string | undefined;
    status?: string | undefined;
    created_at?: string | undefined;
    updated_at?: string | undefined;
  }

  
  interface UnitData {
    id: number;
    unit: string;
    status: number;
    created_by: any; // Replace with actual type if known
    updated_by: any; // Replace with actual type if known
    created_at: string;
    updated_at: string;
    ruas: RuasData[];
  }


  export {
    RuasData,
    UnitData
  }