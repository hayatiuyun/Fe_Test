"use server";
import { getRuas } from "@/services/Ruas";
import { revalidatePath } from "next/cache";

export async function getOneRuas(id: number | undefined) {
  if (!id) return;
  const response = await getRuas(id);
  console.log("PURE RESPONSE", response.data.status);

  if (!response?.data.status) {
    return { error: "Get Ruas Not Successfull" };
  }

  const dataResponse = response?.data.data;
  return { data: dataResponse };

  //   await fs.writeFile(`./public/uploads/${file.name}`, buffer);
}
