import NewPassword from "@/components/user/NewPassword";
import React from "react";

export const metadata = {
  title: "Reset Password",
};

interface Props {
  params: Promise<{ token: string }>;
}

const NewPasswordPage = async ({ params }: Props) => {
  const { token } = await params;
  return (
    <div>
      <NewPassword token={token} />
    </div>
  );
};

export default NewPasswordPage;
