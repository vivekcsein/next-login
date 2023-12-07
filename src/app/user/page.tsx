// "use client";
import React from "react";
import { authOptions } from "../../libs/auth";
import { getServerSession } from "next-auth";

type props = {
  params: {
    newuser: string | number | undefined;
  };
};
const page = async ({ params: { newuser } }: props) => {
  const session = await getServerSession(authOptions);
  const currentPath = String(newuser).toLocaleLowerCase();

  return (
    <div>
      Hello{" "}
      {`${session?.user.username} & your role is ${session?.user.role} user`}
    </div>
  );
};

export default page;
