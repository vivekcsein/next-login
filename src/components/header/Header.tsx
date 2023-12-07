import Link from "next/link";
import React from "react";
import { authOptions } from "../../libs/auth";
import { getServerSession } from "next-auth";
import LogInBtn from "../ui/LogInBtn";

const Header = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="w-full p-5 bg-gray-400 flex justify-center ">
      {session?.user ? (
        <LogInBtn LogInText={"Sign out"} />
      ) : (
        <Link
          className="px-4 py-2 bg-gray-800 hover:bg-white hover:text-black rounded-md"
          href="/signin"
        >
          Sign In
        </Link>
      )}
    </div>
  );
};

export default Header;
