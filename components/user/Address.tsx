"use client";

import React from "react";
import ButtonLoader from "../layout/ButtonLoader";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  submitButtonLabel: string;
  formTitle: string;
  address: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    postalCode: string;
    state: string;
    isDefault?: boolean;
  };
}

const Address = ({
  handleSubmit,
  handleChange,
  isLoading,
  address,
  submitButtonLabel,
  formTitle,
}: Props) => {
  const router = useRouter();

  return (
    <div className="container py-5">
      <div className="card">
        <div className="d-flex justify-content-between">
          <h3 className="mb-0">{formTitle}</h3>
          <Link
            href={"/me/addresses"}
            className="d-flex align-items-start align-items-center mb-2"
          >
            <Image
              src="/lineLeftArrow.svg"
              width={32}
              height={32}
              alt="svg-img"
            />
            <span>Back to addresses</span>
          </Link>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">
                Address Line 1 <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="addressLine1"
                value={address.addressLine1}
                onChange={handleChange}
                placeholder="Enter Address Line 1"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Address Line 2</label>
              <input
                type="text"
                className="form-control"
                name="addressLine2"
                value={address.addressLine2 ?? ""}
                onChange={handleChange}
                placeholder="Apartment, Suite, Landmark (Optional)"
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  City <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={address.city}
                  onChange={handleChange}
                  placeholder="Enter City"
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  State <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="state"
                  value={address.state}
                  onChange={handleChange}
                  placeholder="Enter State"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Postal Code <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="postalCode"
                  value={address.postalCode}
                  onChange={handleChange}
                  placeholder="Enter Postal Code"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <div className="form-check mt-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="defaultAddress"
                    name="isDefault"
                    checked={address.isDefault}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="defaultAddress">
                    Set as Default Address
                  </label>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button
                type="submit"
                className="btn form-btn w-100 py-2"
                disabled={isLoading}
              >
                {isLoading ? <ButtonLoader /> : submitButtonLabel}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Address;
