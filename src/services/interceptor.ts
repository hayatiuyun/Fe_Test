import authOptions from "@/auth/authOptions";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getServerSession } from "next-auth";
import { NextApiRequest } from "next";
import { redirect } from "next/navigation";

const Api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Helper function to set up interceptors
const setupInterceptors = () => {
  // Request interceptor
  Api.interceptors.request.use(
    async (config) => {
      const session = await getServerSession(authOptions);
      if (session?.token) {
        config.headers.Authorization = `Bearer ${session.token}`;
      }
      return config;
    },
    (error) => {
      // console.error("Request interceptor error:", error);
      return Promise.reject(error);
    }
  );

  // Response interceptor
  Api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error: AxiosError<any>) => { // Specify AxiosError<any> to access response.config
      // Handle specific error cases
      if (error.response?.status === 401) {
        const { config } = error.response; // Destructure config directly
        const req = config as AxiosRequestConfig & { req: NextApiRequest }; // Type assertion

        const session = await getServerSession(authOptions); // Fetch session again if needed

        if (session) {
          // await signOut({ callbackUrl: `/sign-in` });
          redirect("/api/auth/signout");
        }
      }
      // console.log("Response interceptor error:", error.response?.data);
      
      return Promise.reject(error);
    }
  );
};

// Call setupInterceptors to initialize interceptors
setupInterceptors();

export default Api;