
import Api from "@/services/interceptor"
import axios from "axios";

interface LoginType {
    username: string;
    password: string;
  }
const postLogin = async ({username, password}: LoginType) => axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, { username, password });
const postLogout = async () => Api.post('/logout');

export { postLogin, postLogout };