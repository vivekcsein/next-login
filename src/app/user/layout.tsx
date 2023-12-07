import Header from "@/components/header/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User",
  description: "User has LoggedIN",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
