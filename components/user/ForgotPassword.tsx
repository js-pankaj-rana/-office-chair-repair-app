"use client";

import { useForgotPasswordMutation } from "@/redux/api/authApi";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ButtonLoader from "../layout/ButtonLoader";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const [forgotPassword, { isLoading, error, isSuccess }] =
    useForgotPasswordMutation();

  useEffect(() => {
    if (error && "data" in error) {
      //@ts-ignore
      toast.error(error?.data?.errMessage);
    }

    if (isSuccess) {
      toast.success("Email Sent Successfully");
    }
  }, [error, isSuccess]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = { email };

    if (userData.email !== "") {
      forgotPassword(userData);
      return;
    }
    toast.error("Please fill the email addresses");
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-3 choose-us">
        <div className="card border rounded p-4 h-100">
          <h4 className="mb-4 text-center">Forgot Password</h4>
          <form onSubmit={submitHandler}>
            <div className="mb-1">
              <label htmlFor="email_field" className="form-label">
                Enter your email address
              </label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                placeholder="someone@zhelps.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn form-btn w-100 py-2"
              disabled={isLoading}
            >
              {isLoading ? <ButtonLoader /> : "Send Email"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
