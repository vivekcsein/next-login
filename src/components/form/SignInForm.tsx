"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FaFacebookF,
  FaGoogle,
  FaLinkedinIn,
  FaRegEnvelope,
} from "react-icons/fa";
import {
  MdLockOutline,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
  MdCancel,
} from "react-icons/md";

const FormSchema = zod.object({
  email: zod.string().min(1, "Email is required").email("Invalid email"),
  password: zod
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

const SignInForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const SignIn_cancel = () => {
    router.push("/");
  };

  const showPassword = () => {
    const passwordON = document.getElementById(
      "SignIn_passwordON"
    ) as HTMLElement;
    const passwordOFF = document.getElementById(
      "SignIn_passwordOFF"
    ) as HTMLElement;
    const SignIn_password = document.getElementById(
      "SignIn_password"
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
    const signIndata = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (signIndata?.error) {
      console.log(signIndata.error);
    } else {
      router.refresh();
      router.push("/user");
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-between  w-full  px-20 text-center text-primary">
        <div className="bg-white rounded-2xl shadow-2xl flex lg:flex-row max-w-3xl relative">
          <div className="w-3/5 p-5 ">
            <div className="text-left font-bold ">
              <span className="text-primary bg-gradient-to-br from-primary to-white text-transparent bg-clip-text">
                Global
              </span>
              company
            </div>
            <div className="py-10 ">
              <h2 className="text-3xl font-bold">Sign in to Account</h2>
              <div className="border-2 w-10 border-primary inline-block mb-2 "></div>
              <div className="socialLogin">
                <div className="flex justify-center my-2 ">
                  <a
                    href="#"
                    className="border-2 border-gray-200 rounded-full p-3 mx-1 hover:bg-primary hover:text-white"
                  >
                    <FaFacebookF className="text-sm" />
                  </a>
                  <a
                    href="#"
                    className="border-2 border-gray-200 rounded-full p-3 mx-1  hover:bg-primary hover:text-white"
                  >
                    <FaGoogle className="text-sm" />
                  </a>
                  <a
                    href="#"
                    className="border-2 border-gray-200 rounded-full p-3 mx-1  hover:bg-primary hover:text-white"
                  >
                    <FaLinkedinIn className="text-sm" />
                  </a>
                </div>
              </div>
              <p className="text-gray-400 pb-2">use your email account</p>
              <div className="formSignIn">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-col items-center mt-4 ">
                    <div className="bg-gray-100 w-64 p-2 flex items-center mb-6 relative ">
                      <div className="absolute top-9">
                        <p className="text-sm">{errors.email?.message}</p>
                      </div>
                      <FaRegEnvelope className=" text-gray-400 mr-3" />
                      <input
                        {...register("email")}
                        type="email"
                        name="email"
                        id=""
                        placeholder="Email"
                        className="bg-gray-100 outline-none text-sm flex-1"
                      />
                    </div>
                    <div className="bg-gray-100 w-64 p-2 flex items-center mb-3 relative ">
                      <div className="absolute top-9">
                        <p className="text-sm">{errors.password?.message}</p>
                      </div>
                      <MdLockOutline className=" text-gray-400 mr-3" />
                      <input
                        {...register("password")}
                        type="password"
                        name="password"
                        id="SignIn_password"
                        placeholder="password"
                        className="bg-gray-100 outline-none text-sm flex-1"
                      />
                      <div
                        className="signinPasswordShowBtn text-gray-400"
                        onClick={() => {
                          showPassword();
                        }}
                      >
                        <div id={`SignIn_passwordON`}>
                          <MdOutlineVisibility />
                        </div>
                        <div id={`SignIn_passwordOFF`}>
                          <MdOutlineVisibilityOff />
                        </div>
                      </div>
                    </div>
                    <input
                      type="submit"
                      value="Sign In"
                      className="border-2 border-primary text-primary rounded-full px-10 py-2 inline-block font-semibold hover:bg-primary hover:text-white mt-8 "
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="w-2/5 bg-primary text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
            {" "}
            <h2 className="text-3xl font-bold mb-2">Hello Friend</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>{" "}
            <p className="mb-2">Lets connect together on same journey </p>{" "}
            <a
              href="/signup"
              className="border-2 border-white rounded-full px-8 py-1 text-sm inline-block font-semibold hover:bg-white hover:text-primary mt-4 sm:text-xxl sm:px-12 sm:py-2  "
            >
              Sign Up
            </a>
          </div>
          <MdCancel
            id="SignIn_cancelform"
            className="absolute text-3xl right-3  text-white "
            onClick={SignIn_cancel}
          />
        </div>
      </div>
    </>
  );
};

export default SignInForm;

{
  /* <a
  type="submit"
  href="#"
  className="border-2 border-primary text-primary rounded-full px-12 py-2 inline-block font-semibold hover:bg-primary hover:text-white mt-4 "
  onClick={(e) => {
    onSubmit;
  }}
>
  Sign In
</a>; */
}

// <form onSubmit={handleSubmit(onSubmit)}>
//   <input {...register("email")} />
//   <p>{errors?.email?.message}</p>

//   <input {...register("password")} />
//   <p>{errors?.password?.message}</p>

//   <input type="submit" />
// </form>;

//   return (
//     <>
//       <div className="flex min-h-screen flex-col items-center justify-between  w-full  px-20 text-center text-primary">
//         <div className="bg-white rounded-2xl shadow-2xl flex lg:flex-row max-w-3xl relative">
//           <div className="w-3/5 p-5 ">
//             <div className="text-left font-bold ">
//               {" "}
//               <span className="text-primary bg-gradient-to-br from-primary to-white text-transparent bg-clip-text">
//                 Global
//               </span>{" "}
//               company{" "}
//             </div>
//             <div className="py-10 ">
//               <h2 className="text-3xl font-bold">Sign in to Account</h2>
//               <div className="border-2 w-10 border-primary inline-block mb-2 "></div>
//               <div className="flex justify-center my-2 ">
//                 <a
//                   href="#"
//                   className="border-2 border-gray-200 rounded-full p-3 mx-1 hover:bg-primary hover:text-white"
//                 >
//                   <FaFacebookF className="text-sm" />
//                 </a>
//                 <a
//                   href="#"
//                   className="border-2 border-gray-200 rounded-full p-3 mx-1  hover:bg-primary hover:text-white"
//                 >
//                   <FaGoogle className="text-sm" />
//                 </a>
//                 <a
//                   href="#"
//                   className="border-2 border-gray-200 rounded-full p-3 mx-1  hover:bg-primary hover:text-white"
//                 >
//                   <FaLinkedinIn className="text-sm" />
//                 </a>
//               </div>
//               <p className="text-gray-400 pb-2">use your email account</p>
//                     <div className="formSignIn">
//                 <form onSubmit={handleSubmit(onSubmit)}>
//               <div className="flex flex-col items-center ">
//                   <div className="bg-gray-100 w-64 p-2 flex items-center mb-3 ">
//                     <FaRegEnvelope className=" text-gray-400 mr-3" />
//                     <input
//                       type="email"
//                       name="email"
//                       id=""
//                       placeholder="Email"
//                       className="bg-gray-100 outline-none text-sm flex-1"
//                     />
//                   </div>
//                   <div className="bg-gray-100 w-64 p-2 flex items-center mb-3 ">
//                     <MdLockOutline className=" text-gray-400 mr-3" />
//                     <input
//                       type="password"
//                       name="password"
//                       id="SignIn_password"
//                       placeholder="password"
//                       className="bg-gray-100 outline-none text-sm flex-1"
//                     />
//                     <div
//                       className="signinPasswordShowBtn text-gray-400"
//                       onClick={() => {
//                         showPassword();
//                       }}
//                     >
//                       <div id={`SignIn_passwordON`}>
//                         <MdOutlineVisibility />
//                       </div>
//                       <div id={`SignIn_passwordOFF`}>
//                         <MdOutlineVisibilityOff />
//                       </div>
//                     </div>
//                   </div>
//               </div>
//               <div className="flex justify-center gap-5 mb-5">
//                 <label htmlFor="" className="flex items-center text-xs">
//                   <input type="checkbox" name="remember" className="mr-1" />
//                   Remember me
//                 </label>
//                 {/* <a href="#" className="text-xs">
//                   Forgot Password?
//                 </a> */}
//               </div>
//               <a
//                 type="submit"
//                 href="#"
//                 className="border-2 border-primary text-primary rounded-full px-12 py-2 inline-block font-semibold hover:bg-primary hover:text-white mt-4 "
//                 // onClick={(e) => {
//                 //   onSubmit;
//                 // }}
//               >
//                 Sign In
//               </a>
//             </div>
//                             </form>
//                             </div>
//           </div>
//           <div className="w-2/5 bg-primary text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
//             <h2 className="text-3xl font-bold mb-2">Hello Friend</h2>
//             <div className="border-2 w-10 border-white inline-block mb-2"></div>
//             <p className="mb-2">Lets connect together on same journey </p>
//             <a
//               href="/signup"
//               className="border-2 border-white rounded-full px-8 py-1 text-sm inline-block font-semibold hover:bg-white hover:text-primary mt-4 sm:text-xxl sm:px-12 sm:py-2  "
//             >
//               Sign Up
//             </a>
//           </div>
//           <MdCancel
//             id="SignIn_cancelform"
//             className="absolute text-3xl right-3  text-white "
//             onClick={SignIn_cancel}
//           />
//         </div>
//       </div>
//     </>
//   );
