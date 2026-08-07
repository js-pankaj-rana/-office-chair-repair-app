import React from "react";
import UserAddressList from "@/components/user/UserAddressList";

export const metadata = {
  title: "User address list",
};

const UserAddressPage = () => {
  return (
    <div>
      <UserAddressList />
    </div>
  );
};

export default UserAddressPage;
