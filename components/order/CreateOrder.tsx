"use client";

import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useCreateOrderMutation } from "@/redux/api/orderApi";
import Loader from "../layout/Loader";
import { useRouter } from "next/navigation";

const CreateOrder: React.FC = () => {
  const router = useRouter();
  const [createOrder, {}] = useCreateOrderMutation();

  const payloadData = {
    orderStatus: "Start",
    serviceCode: "CH",
  };

  useEffect(() => {
    const generateOrder = async () => {
      try {
        const data = await createOrder(payloadData).unwrap();
        const { success, data: res } = data;
        toast.success("Navigation to create form route....");
        if (success) {
          router.push(`/order/update/${res._id}`);
        }
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to create order");
      }
    };

    generateOrder();
  }, []);

  return <Loader />;
};

export default CreateOrder;
