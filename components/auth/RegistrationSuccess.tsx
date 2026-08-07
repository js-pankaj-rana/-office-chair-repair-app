"use client";

import React from "react";
import Link from "next/link";
import { REGISTRATION_SUCCESS } from "@/constants/auth";
import { usePathname } from "next/navigation";

const RegistrationSuccess = () => {
  const pathname = usePathname();
  const hasLoginRoute = pathname.includes("login");

  return (
    <div className="text-center">
      {!hasLoginRoute && (
        <>
          <div
            className="d-inline-flex align-items-center justify-content-center rounded-circle bg-success-subtle mb-2"
            style={{ width: 80, height: 80, transform: "scale(.7)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="#198754"
              viewBox="0 0 16 16"
            >
              <path d="M16 2.5L6 12.5 0 6.5l1.5-1.5L6 9.5 14.5 1z" />
            </svg>
          </div>

          <h4 className="fw-bold mb-3">{REGISTRATION_SUCCESS.TITLE}</h4>

          <div className="para-text mb-2">{REGISTRATION_SUCCESS.SUBTITLE}</div>
        </>
      )}

      <div
        className={`registration-success text-start ${hasLoginRoute ? " card border p-4" : "px-4"}`}
      >
        {!hasLoginRoute ? (
          <h5 className="alert-heading">
            {REGISTRATION_SUCCESS.EMAIL_VERIFICATION.TITLE}
          </h5>
        ) : (
          <h4 className="alert-heading">
            {REGISTRATION_SUCCESS.EMAIL_VERIFICATION.TITLE}
          </h4>
        )}

        <p>{REGISTRATION_SUCCESS.EMAIL_VERIFICATION.DESCRIPTION}</p>

        <ul className="list-unstyled pl-2">
          {REGISTRATION_SUCCESS.EMAIL_VERIFICATION.STEPS.map((step) => (
            <li
              key={step}
              className="d-flex align-items-start align-items-center mb-2"
            >
              <span>{step}</span>
            </li>
          ))}
        </ul>
        <p className="small">
          {REGISTRATION_SUCCESS.EMAIL_VERIFICATION.FOOTER}
        </p>
        {hasLoginRoute && (
          <Link href="/" className="btn btn-primary">
            {REGISTRATION_SUCCESS.BUTTONS.HOME}
          </Link>
        )}
      </div>
    </div>
  );
};

export default RegistrationSuccess;
