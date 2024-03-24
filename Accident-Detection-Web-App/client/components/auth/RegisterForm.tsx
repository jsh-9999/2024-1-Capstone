"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../ui/button";
import axios from "@/lib/axios";
import toast from "react-hot-toast";

type FormData = {
  email: string;
  password: string;
};

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const handleSignUpSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // 서버로 회원가입 요청을 보냄
      const response = await axios.post(
        "http://127.0.0.1:8080/api/v1/auth/register",
        {
          username: data.email,
          password: data.password,
        }
      );

      // 회원가입 성공 메시지 출력
      toast.success(response.data.msg);

      // 회원가입 폼 초기화
      reset();

      // 로그인 페이지로 이동
      // router.push("/auth/login"); // 라우터를 사용하지 않고 페이지 이동
      window.location.href = "/auth/login"; // 페이지 이동
    } catch (error: any) {
      // 회원가입 실패 메시지 출력
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="sm:max-w-[460px] shadow-sm mx-auto bg-white p-5 border rounded-md">
      <h2 className="text-2xl font-bold pb-5 text-center underline">Sign Up</h2>
      <form onSubmit={handleSubmit(handleSignUpSubmit)} className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="email">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-md border outline-none"
            autoComplete="off"
            {...register("email", { required: "Email is required" })}
          />
          <span className="inline-block text-sm text-red-500">
            {errors.email && errors.email.message}
          </span>
        </div>
        <div className="space-y-2">
          <label htmlFor="password">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            className="w-full px-4 py-3 rounded-md border outline-none"
            autoComplete="off"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          <span className="inline-block text-sm text-red-500">
            {errors.password && errors.password.message}
          </span>
        </div>
        <Button className="w-full" size={"lg"}>
          Sign Up
        </Button>
      </form>
    </div>
  );
}
