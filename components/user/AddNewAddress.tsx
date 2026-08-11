"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/userSlice";
import {
  useLazyUpdateSessionQuery,
  useAddAddressMutation,
} from "@/redux/api/userApi";

import Address from "./Address";
import { IAddressForm } from "@/backend/models/orderdetails";
import { useRouter } from "next/navigation";

const AddNewAddress: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [addAddress, { isLoading, isSuccess, error }] = useAddAddressMutation();

  const [updateSession, { data }] = useLazyUpdateSessionQuery();

  const [address, setAddress] = useState<IAddressForm>({
    addressLine1: "",
    addressLine2: undefined,
    city: "",
    postalCode: "",
    state: "",
    isDefault: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "isDefault") {
      setAddress((prev) => ({
        ...prev,
        [name]: e.target.checked,
      }));
      return;
    }

    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (data) {
      dispatch(setUser(data.user));
    }
  }, [data, dispatch]);

  // Handle API errors
  useEffect(() => {
    if (error && "data" in error) {
      // @ts-ignore
      toast.error(error.data.errMessage);
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      // @ts-ignore
      updateSession();
      router.refresh();
      toast.success("New address added successfully");
    }
  }, [isSuccess]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { addressLine1, addressLine2, city, postalCode, state, isDefault } =
      address;

    const payload = {
      address: {
        addressLine1,
        addressLine2,
        city,
        postalCode,
        state,
        isDefault,
      },
    };

    addAddress(payload);
  };

  return (
    <Address
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      address={address}
      isLoading={isLoading}
      submitButtonLabel="Add Address"
      formTitle="Add new address"
    />
  );
};

export default AddNewAddress;
