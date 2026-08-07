"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "@/redux/hooks";

import {
  useLazyUpdateSessionQuery,
  useEditAddressMutation,
  useGetAddressQuery,
} from "@/redux/api/userApi";

import Address from "./Address";
import { IAddressForm, IAddress } from "@/backend/models/user";
import { useRouter } from "next/router";

export default function EditAddress() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const id = params.id as string;
  // const router = useRouter();

  // const handleBackAddresses = () => {
  //     router.push("/me/addresses");
  // }
  const [editAddress, { isLoading, isSuccess, error }] =
    useEditAddressMutation();

  const { data } = useGetAddressQuery(id);
  const [updateSession, { data: sessionData }] = useLazyUpdateSessionQuery();

  const [updateAddress, setUpdateAddress] = useState<IAddressForm>({
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    isDefault: false,
    state: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "isDefault") {
      setUpdateAddress((prev) => ({
        ...prev,
        [name]: e.target.checked,
      }));
      return;
    }

    setUpdateAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!data) {
      return;
    }

    if (data?.data) {
      const { data: address } = data;
      const { addressLine1, addressLine2, city, postalCode, isDefault, state } =
        address;
      setUpdateAddress((prev) => ({
        ...prev,
        addressLine1,
        addressLine2,
        city,
        postalCode,
        isDefault,
        state,
      }));
    }
  }, [data]);
  // Handle API errors
  // useEffect(() => {
  //   if (error && "address" in error) {
  //     // @ts-expect-error
  //     toast.error(error.data.errMessage);
  //   }
  // }, [error]);

  useEffect(() => {
    if (isSuccess) {
      // @ts-ignore
      updateSession();
      toast.success("Edit address successfully");
    }
  }, [isSuccess]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const address = {
      ...updateAddress,
    };
    await editAddress({ id, address });
  };

  return (
    <Address
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      address={updateAddress}
      isLoading={false}
      submitButtonLabel="Edit Address"
      formTitle="Edit exiting address"
    />
  );
}
