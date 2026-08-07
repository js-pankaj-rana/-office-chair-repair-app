"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import {
  useLazyUpdateSessionQuery,
  useUpdateProfileMutation,
} from "@/redux/api/userApi";
import { setUser } from "@/redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import ButtonLoader from "../layout/ButtonLoader";

const UpdateProfile = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initialLoad = useRef(false);

  const { user: currentUser } = useAppSelector((state) => state.auth);

  const [profileUpdate, setProfileUpdate] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [updateProfile, { isLoading, isSuccess, error }] =
    useUpdateProfileMutation();

  const [updateSession, { data }] = useLazyUpdateSessionQuery();

  // Populate form when user data is available
  useEffect(() => {
    if (currentUser && !initialLoad.current) {
      setProfileUpdate({
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone,
      });
      initialLoad.current = false;
    }
  }, [currentUser]);

  // Update Redux after session refresh
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

  // Handle success
  useEffect(() => {
    if (isSuccess) {
      updateSession();
      router.refresh();
      toast.success("Profile updated successfully");
    }
  }, [isSuccess, updateSession, router]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProfileUpdate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateProfile(profileUpdate);
  };

  return (
    <div className="container py-5">
      <form className="bg-body" onSubmit={submitHandler}>
        <h3 className="mb-4">Update Profile</h3>

        <div className="mb-3">
          <label htmlFor="name_field" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name_field"
            className="form-control"
            name="name"
            value={profileUpdate.name}
            onChange={changeHandler}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email_field" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email_field"
            className="form-control"
            name="email"
            value={profileUpdate.email}
            onChange={changeHandler}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone_field" className="form-label">
            Phone
          </label>
          <input
            type="tel"
            id="phone_field"
            className="form-control"
            name="phone"
            value={profileUpdate.phone}
            onChange={changeHandler}
          />
        </div>

        <button
          type="submit"
          className="btn form-btn w-100 py-2"
          disabled={isLoading}
        >
          {isLoading ? <ButtonLoader /> : "UPDATE"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
