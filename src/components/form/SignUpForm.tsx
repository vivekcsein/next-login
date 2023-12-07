"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaRegEnvelope, FaUser } from "react-icons/fa";
import {
  MdLockOutline,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
  MdCancel,
} from "react-icons/md";

const FormSchema = zod
  .object({
    username: zod.string().min(6, "username must have 6 digits"),
    email: zod.string().min(1, "Email is required").email("Invalid email"),
    password: zod
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have than 8 characters"),
    confirmPassword: zod
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have than 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "confirm passwords do not match",
  });

const SignUpForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const SignIn_cancel = () => {
    router.push("/");
  };

  const showPassword = () => {
    const passwordON = document.getElementById(
      "SignUp_passwordON"
    ) as HTMLElement;
    const passwordOFF = document.getElementById(
      "SignUp_passwordOFF"
    ) as HTMLElement;
    const SignIn_password = document.getElementById(
      "SignUp_password"
    ) as HTMLInputElement;

    if (window.getComputedStyle(passwordON).display == "none") {
      passwordON.style.display = "block";
      passwordOFF.style.display = "none";
      SignIn_password.type = "password";
    } else {
      passwordON.style.display = "none";
      passwordOFF.style.display = "block";
      SignIn_password.type = "text";
    }
  };
  const showconfirmPassword = () => {
    const passwordON = document.getElementById(
      "SignUp_confirmPasswordON"
    ) as HTMLElement;
    const passwordOFF = document.getElementById(
      "SignUp_confirmPasswordOFF"
    ) as HTMLElement;
    const SignIn_password = document.getElementById(
      "SignUp_confirmPassword"
    ) as HTMLInputElement;

    if (window.getComputedStyle(passwordON).display == "none") {
      passwordON.style.display = "block";
      passwordOFF.style.display = "none";
      SignIn_password.type = "password";
    } else {
      passwordON.style.display = "none";
      passwordOFF.style.display = "block";
      SignIn_password.type = "text";
    }
  };

  const onSubmit = async (values: zod.infer<typeof FormSchema>) => {
    const res = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    });
    if (res.ok) {
      router.push("/signin");
    } else {
      console.error("something happen wrong");
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-between  w-full  px-20 text-center text-primary">
        <div className="bg-white rounded-2xl shadow-2xl flex lg:flex-row max-w-3xl relative">
          <div className="w-3/5 p-5 ">
            <div className="text-left font-bold ">
              {" "}
              <span className="text-primary bg-gradient-to-br from-primary to-white text-transparent bg-clip-text">
                Global
              </span>{" "}
              company{" "}
            </div>
            <div className="py-10 ">
              <h2 className="text-3xl font-bold">Sign Up to Account</h2>
              <div className="border-2 w-10 border-primary inline-block mb-2 "></div>
              <p className="text-gray-400 pb-2">use your email account</p>
              <div className="formSignUp">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-col items-center ">
                    <div className="bg-gray-100 w-64 p-2 flex items-center mb-7 relative ">
                      <div className="absolute top-9">
                        <p className="text-sm">{errors.username?.message}</p>
                      </div>
                      <FaUser className=" text-gray-400 mr-3" />
                      <input
                        {...register("username")}
                        type="username"
                        name="username"
                        id=""
                        placeholder="Enter a username"
                        className="bg-gray-100 outline-none text-sm flex-1"
                      />
                    </div>
                    <div className="bg-gray-100 w-64 p-2 flex items-center mb-7 relative ">
                      <div className="absolute top-9">
                        <p className="text-sm">{errors.email?.message}</p>
                      </div>
                      <FaRegEnvelope className=" text-gray-400 mr-3" />
                      <input
                        {...register("email")}
                        type="email"
                        name="email"
                        id=""
                        placeholder="Enter your Email"
                        className="bg-gray-100 outline-none text-sm flex-1"
                      />
                    </div>
                    <div className="bg-gray-100 w-64 p-2 flex items-center mb-7 relative ">
                      <div className="absolute top-9">
                        <p className="text-sm">{errors.password?.message}</p>
                      </div>
                      <MdLockOutline className=" text-gray-400 mr-3" />
                      <input
                        {...register("password")}
                        type="password"
                        name="password"
                        id="SignUp_password"
                        placeholder="password"
                        className="bg-gray-100 outline-none text-sm flex-1"
                      />
                      <div
                        className="signupPasswordShowBtn text-gray-400"
                        onClick={() => {
                          showPassword();
                        }}
                      >
                        <div id={`SignUp_passwordON`}>
                          <MdOutlineVisibility />
                        </div>
                        <div id={`SignUp_passwordOFF`}>
                          <MdOutlineVisibilityOff />
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-100 w-64 p-2 flex items-center mb-7 relative">
                      <div className="absolute top-9">
                        <p className="text-sm">
                          {errors.confirmPassword?.message}
                        </p>
                      </div>
                      <MdLockOutline className=" text-gray-400 mr-3" />
                      <input
                        {...register("confirmPassword")}
                        type="password"
                        name="confirmPassword"
                        id="SignUp_confirmPassword"
                        placeholder="confirm password"
                        className="bg-gray-100 outline-none text-sm flex-1"
                      />
                      <div
                        className="signupPasswordShowBtn text-gray-400"
                        onClick={() => {
                          showconfirmPassword();
                        }}
                      >
                        <div id={`SignUp_confirmPasswordON`}>
                          <MdOutlineVisibility />
                        </div>
                        <div id={`SignUp_confirmPasswordOFF`}>
                          <MdOutlineVisibilityOff />
                        </div>
                      </div>
                    </div>
                    <input
                      type="submit"
                      value="Sign Up"
                      className="border-2 border-primary text-primary rounded-full px-10 py-2 inline-block font-semibold hover:bg-primary hover:text-white mt-8 "
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="w-2/5 bg-primary text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-3xl font-bold mb-2">Hello Friend</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-2">Already Have an Account, so you can signin </p>
            <a
              href="/signin"
              className="border-2 border-white rounded-full px-8 py-1 text-sm inline-block font-semibold hover:bg-white hover:text-primary mt-4 sm:text-xxl sm:px-12 sm:py-2  "
            >
              Sign In
            </a>
          </div>
          <MdCancel
            className=" SignIn_cancelform absolute text-3xl right-3  text-white "
            onClick={SignIn_cancel}
          />
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
