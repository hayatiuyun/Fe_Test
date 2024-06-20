"use server";
import { deleteRuas } from "@/services/Ruas";
import { revalidatePath, revalidateTag } from 'next/cache'

export async function ruasDelete(id: number) {

  const response = await deleteRuas(id)
  console.log("TAJAJH RESPONSE", response.data.status, id);
  
  if (!response?.data.status) {
    return {error: "Submit Form Not Successfull"}
  }

  const dataResponse = response?.data.data
  revalidatePath("/master-data")
  return {data: dataResponse}
//   await fs.writeFile(`./public/uploads/${file.name}`, buffer);

}