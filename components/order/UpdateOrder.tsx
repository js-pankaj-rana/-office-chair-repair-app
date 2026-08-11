"use client";

import React, { ChangeEvent, useState, useEffect, useRef } from "react";
import { IImage, IOrderStatus, IPayment } from "@/backend/models/orderdetails";
import toast from "react-hot-toast";
import OrderForm from "./OrderForm";
import {
  useUpdateOrderMutation,
  useGetOrderByIdQuery,
  useLazyGetOrderByIdQuery,
} from "@/redux/api/orderApi";
import Loader from "../layout/Loader";
import { useRouter } from "next/navigation";

export interface IBookingForm {
  productImages: IImage[];
  orderNumber: number;
  orderStatus: IOrderStatus;
  scheduleDate: Date | null;
  scheduleTime: string;
  faultDescription: string;
  serviceCode: string;
  paymentInfo: IPayment[];
  quantityOrdered: number;
  orderEstimatedPrice: number;
}

const MAX_IMAGES = 5;

interface UpdateOrderProps {
  id: string;
}

const UpdateOrder: React.FC<UpdateOrderProps> = ({ id }) => {
  const [updateOrder, { error, isLoading, isSuccess }] =
    useUpdateOrderMutation();

  const initialized = useRef(false);

  // const [ getOrderById, { error: getOrderError, isLoading: isOrderLoading, isSuccess: isOrderSuccess } = useGetOrderByIdQuery();

  const [getOrderById, { data: order, isLoading: isOrderLoading }] =
    useLazyGetOrderByIdQuery();

  const [booking, setBooking] = useState<IBookingForm>({
    productImages: [],
    orderNumber: 0,
    orderStatus: "Start",
    scheduleDate: new Date(),
    faultDescription: "",
    scheduleTime: "",
    serviceCode: "CHAIR",
    paymentInfo: [],
    quantityOrdered: 1,
    orderEstimatedPrice: 0,
  });

  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    getOrderById(id);
  }, [id]);

  useEffect(() => {
    if (error && "data" in error) {
      // @ts-ignore
      toast.error(error?.data?.errMessage);
    }
  }, [error, isSuccess]);

  useEffect(() => {
    if (!initialized.current && order?.data) {
      setBooking((prev) => ({ ...prev, ...order.data }));
      initialized.current = true;
    }
  }, [order]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setBooking((prev) => ({
      ...prev,
      [name]:
        name === "quantityOrdered" || name === "orderNumber"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (reqPayload) => {
    const {
      createdAt: _createdAt,
      orderEstimatedPrice: _orderEstimatedPrice,
      orderStatus: _orderStatus,
      paymentInfo: _paymentInfo,
      productImages: _productImages,
      user: _user,
      updatedAt: _updatedAt,
      ...restData
    } = reqPayload;
    updateOrder(restData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Your order has been created.");
      router.push("/orders");
    }
  }, [isSuccess]);
  return (
    <>
      {isOrderLoading || isLoading ? (
        <Loader />
      ) : (
        <OrderForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          booking={booking}
          isLoading={false}
          formTitle="Create your booking"
          submitButtonLabel="Create Booking"
          type="create"
        />
      )}
    </>
  );
};

export default UpdateOrder;
