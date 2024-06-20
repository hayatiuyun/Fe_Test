"use client";
import { Box, Container } from "@mui/material";
import Image from "next/image";

import React from "react";
import Header from "./Header";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="flex">
      <Box
        width={{
          xs: "100%",
          lg: "50%",
        }}
        height={{
          xs: "75vh",
          lg: "100vh",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="start"
          justifyContent="center"
          mx="auto"
          my="auto"
          height="100%"
          maxWidth={448}
          gap={{
            xs: 5,
            lg: 8,
          }}
        >
          <Header />
          {children}
        </Box>
      </Box>
      <Box
        display={{
          xs: "none",
          lg: "block",
        }}
        width={{
          xs: "100%",
          lg: "50%",
        }}
        sx={{
          background: "white",
          overflow: "hidden !important",
        }}
        height={{
          xs: "75vh",
          lg: "100vh",
        }}
        position="relative"
      >
        <div className="w-[40vw] h-screen relative flex items-center">
          <Image
            src="/illustrations/map.png"
            alt="roadmap-illustrations"
            width={1980}
            height={1980}
            className="absolute"
          />
        </div>
        <div
          className="!bg-white px-4 flex items-center absolute z-10 !bg-opacity-70 !backdrop-blur-sm w-56 h-au aspect-video !rounded-3xl !shadow-2xl !top-[31%] !left-[40%] !transform !-translate-x-1/2 !-translate-y-1/2 !bg-gradient-to-br from-primary to-secondary"
        >
          <div className="flex flex-col gap-2">
            <h2>Hello...</h2>
            <h2>How long distance here to Padalarang Tol?</h2>
          </div>
        </div>
        <div
          className="!bg-white px-4 flex items-center absolute z-10 !bg-opacity-70 !backdrop-blur-sm w-56 h-12 !rounded-3xl !shadow-2xl !bottom-[38%] !left-[30%] !transform !-translate-x-1/2 !-translate-y-1/2 !bg-gradient-to-br from-primary to-secondary"
        >
          <div className="flex flex-col gap-2">
            <h2>Idk 😕 ...</h2>
          </div>
        </div>
      </Box>
    </main>
  );
};

export default AuthLayout;
