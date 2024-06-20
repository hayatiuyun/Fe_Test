// components/LoginForm.tsx
"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Button, TextField, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type LoginFormInputs = {
  username: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const router = useRouter();


  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        username: data.username,
        password: data.password,
      });

      router.push("/dashboard");
    } catch (error) {
      console.error("Sign in error", error); // Handle sign in error
    }
  };

  return (
    <div className="max-w-md h-auto mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          fullWidth
          {...register("username", { required: "Username is required" })}
          error={!!errors.username}
          helperText={errors.username?.message}
          sx={{
            background: "#FFF"
          }}
          InputLabelProps={{
            sx: {
              color: "#C360AC",
              fontSize: "1.05rem"
            }
          }}
        />
        <TextField
          id="password"
          type="password"
          label="Password"
          variant="outlined"
          fullWidth
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password?.message}
          InputLabelProps={{
            sx: {
              color: "#C360AC",
              fontSize: "1.05rem"
            }
          }}
          sx={{
            background: "#FFF",
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
        >
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
