"use client";
import React from "react";
import { signOut } from "next-auth/react";
type LogInBtnProps = {
  handlerFunc?: () => void;
  LogInText: String;
};

const LogInBtn = ({ handlerFunc, LogInText }: LogInBtnProps) => {
  const handler = (e: any) => {
    e.preventDefault();
    if (handlerFunc) {
      handlerFunc();
    } else {
      signOut({
        redirect: true,
        callbackUrl: `${window.location.origin}/signin`,
      });
    }
  };

  return (
    <button
      onClick={handler}
      className="px-4 py-2 bg-orange-800 text-white hover:bg-white hover:text-black rounded-md"
    >
      {LogInText}
    </button>
  );
};

export default LogInBtn;
