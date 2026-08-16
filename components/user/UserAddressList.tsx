"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Types } from "mongoose";
import { toast } from "react-hot-toast";
import { IAddress } from "@/backend/models/user";
import {
  useGetAddressListQuery,
  useDeleteAddressMutation,
} from "@/redux/api/userApi";
import { setUserAddress } from "@/redux/features/userSlice";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";

const UserAddressList = () => {
  const { data: addresses } = useGetAddressListQuery(null);
  const dispatch = useDispatch();
  // const { data: addresses } = useGetAddressListQuery(null);
  const data = useSession();

  useEffect(() => {
    if (data && addresses && addresses.data) {
      dispatch(setUserAddress(addresses.data));
    }
  }, [data, addresses]);

  const [deleteAddress, { isLoading, isSuccess, error }] =
    useDeleteAddressMutation();

  const router = useRouter();

  const handleEdit = (id: Types.ObjectId) => {
    router.push(`/me/address/edit/${id}`);
  };

  const handleDelete = (id: Types.ObjectId) => {
    deleteAddress(id);
  };

  const pushToNewAddress = () => {
    router.push("/me/address/add");
  };

  if (!addresses?.data) {
    return <p>loading...</p>;
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">My Addresses</h3>
        <button className="btn btn-primary" onClick={pushToNewAddress}>
          + Add New Address
        </button>
      </div>

      <div className="row g-4">
        {addresses?.data?.map((item: IAddress) => (
          <div className="col-md-6 col-lg-4" key={String(item._id)}>
            <div className="card h-100 border address-card p-4 position-relative">
              {item.isDefault && (
                <div className="position-absolute top-0 end-0">
                  <span className="default">DEFAULT</span>
                  {/* <Image src="/circle-tick.png" width={32} height={32} alt="tick icon" /> */}
                </div>
              )}
              <h4 className="mb-0">Address {item.postalCode}</h4>
              <div className="card-body">
                <h6 className="fw-bold">{item.addressLine1}</h6>

                {item.addressLine2 && (
                  <p className="text-muted mb-2">{item.addressLine2}</p>
                )}

                <p className="mb-1">
                  <strong>City:</strong> {item.city}
                </p>

                <p className="mb-1">
                  <strong>State:</strong> {item.state}
                </p>

                <p className="mb-0">
                  <strong>Postal Code:</strong> {item.postalCode}
                </p>
              </div>

              <div className="d-flex mt-3 justify-content-between">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => handleEdit(item._id)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAddressList;
