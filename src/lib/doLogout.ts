"use server";
import { postLogout } from "@/services/Auth";

export async function doLogout() {

  const response = await postLogout()
  
  if (!response?.data.status) {
    return {error: "Logout Not Successfull"}
  }

  const dataResponse = response?.data.data
  return {data: dataResponse}
//   await fs.writeFile(`./public/uploads/${file.name}`, buffer);

}