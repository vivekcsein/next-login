import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "login Page",
  description: "Generated by create next app",
};

interface AuthLayoutProps {
  children: React.ReactNode;
}
const layout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="bg-primary pt-20 grid place-items-center rounded-md w-full h-full">
      {children}
    </div>
  );
};

export default layout;
