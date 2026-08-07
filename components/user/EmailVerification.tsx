"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/layout/Loader";
import { useLazyResetEmailAddressQuery } from "@/redux/api/userApi";
import ButtonLoader from "../layout/ButtonLoader";
import { toast } from "react-hot-toast";
import Link from "next/link";

type VerificationStatus = "loading" | "success" | "error";

interface Props {
  token: string;
}

const EmailVerification = ({ token }: Props) => {
  const [status, setStatus] = useState<VerificationStatus>("loading");
  const [message, setMessage] = useState("Verifying your email...");

  const [resetEmailAddress, { data: emailVerificationData, isLoading }] =
    useLazyResetEmailAddressQuery();

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Invalid verification link.");
      }

      try {
        const response = await fetch(`/api/auth/email/verification/${token}`, {
          method: "GET",
        });

        const data = await response.json();

        if (!response.ok) {
          setStatus("error");
          throw new Error(data.errMessage || "Email verification failed.");
        }

        setStatus("success");
        setMessage(
          data.message || "Your email has been verified successfully."
        );
      } catch (error) {
        setStatus("error");
        setMessage(
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again."
        );
      }
    };

    verifyEmail();
  }, [token]);

  useEffect(() => {
    if (emailVerificationData && emailVerificationData.success) {
      toast.success("Your email has been sent successfully.");
    }
  }, [emailVerificationData]);

  if (status === "loading") {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Loader />
      </div>
    );
  }
  if (!token) {
    throw Error("Something went wrong");
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body text-center p-5">
              <div className="mb-4">
                {status === "success" ? (
                  <i className="bi bi-check-circle-fill text-success fs-1"></i>
                ) : (
                  <i className="bi bi-x-circle-fill text-danger fs-1"></i>
                )}
              </div>

              <h2 className="mb-3">
                {status === "success"
                  ? "Email Verified!"
                  : "Verification Failed"}
              </h2>

              <>
                <p className="text-muted">{message}</p>
              </>

              {status === "error" &&
              message.includes("Email validation token") ? (
                <div className="text-center mt-2">
                  {!emailVerificationData?.success && (
                    <button
                      className="btn form-btn w-100 py-2"
                      disabled={isLoading}
                      onClick={() => resetEmailAddress(token)}
                    >
                      {isLoading ? (
                        <ButtonLoader />
                      ) : (
                        "Resend verification link"
                      )}
                    </button>
                  )}
                </div>
              ) : (
                <Link href="/login" className="btn btn-primary mt-3">
                  Go to Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
