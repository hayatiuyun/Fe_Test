"use server";
import { addRuas } from "@/services/Ruas";
import { revalidatePath, revalidateTag } from 'next/cache'

export async function postRuas(formData: FormData, id: number | undefined) {
  console.log("TAJAJH RESPONSE", id);

  const response = await addRuas(formData, id)
  console.log("TAJAJH RESPONSE", response.data.status, id);
  
  if (!response?.data.status) {
    return {error: "Submit Form Not Successfull"}
  }

  const dataResponse = response?.data.data
  revalidatePath("/master-data")
  return {data: dataResponse}
//   await fs.writeFile(`./public/uploads/${file.name}`, buffer);

}