import Error from "@/app/error";
import EditAddress from "@/components/user/EditAddress";
// import { getAuthHeader } from "@/helpers/authHeader";

import React from "react";

export const metadata = {
  title: "Edit address",
};

export default async function EditAddressPage() {
  return (
    <div>
      <EditAddress />
    </div>
  );
}
