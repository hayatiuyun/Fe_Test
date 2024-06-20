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
        }}
        height={{
          xs: "75vh",
          lg: "100vh",
        }}
        position="relative"
        overflow="hidden"
      >
        <div
          className="!bg-white relative z-10 !bg-opacity-20 !backdrop-blur-sm w-11/12 h-[91.666667%] !rounded-3xl !shadow-2xl !top-1/2 !left-1/2 !transform !-translate-x-1/2 !-translate-y-1/2 !bg-gradient-to-br from-primary to-secondary"
        >

        </div>
      </Box>
    </main>
  );
};

export default AuthLayout;
