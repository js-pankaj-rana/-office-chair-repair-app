"use client";

import Image from "next/image";
import React from "react";

export interface BillingAddressData {
  billingName?: string;
  gstin?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
}

interface BillingAddressProps {
  data: BillingAddressData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setIsBillingAddress: (arg: boolean) => void;
}

const BillingAddress: React.FC<BillingAddressProps> = ({
  data,
  onChange,
  setIsBillingAddress,
}) => {
  return (
    <div className="row">
      <div className="col-md-6">
        <div className="card shadow-sm border-0 mt-4">
          <div className="card-header bg-light">
            <div className="d-flex justify-content-between">
              <h3 className="mb-0">Billing Address</h3>
              <button
                className="d-flex align-items-start align-items-center mb-2"
                onClick={() => setIsBillingAddress(false)}
              >
                <Image
                  src="/lineLeftArrow.svg"
                  width={32}
                  height={32}
                  alt="svg-img"
                />
                <span>Back</span>
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Billing Person / Business Name{" "}
                  <span className="text-muted">(Optional)</span>
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="billingName"
                  value={data.billingName}
                  onChange={onChange}
                  placeholder="Enter Business Name"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  GSTIN Number <span className="text-muted">(Optional)</span>
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="gstin"
                  value={data.gstin}
                  onChange={onChange}
                  placeholder="22AAAAA0000A1Z5"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Address Line 1 <span className="text-danger">*</span>
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="addressLine1"
                  value={data.addressLine1}
                  onChange={onChange}
                  placeholder="House No, Street"
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Address Line 2</label>

                <input
                  type="text"
                  className="form-control"
                  name="addressLine2"
                  value={data.addressLine2}
                  onChange={onChange}
                  placeholder="Apartment, Landmark"
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">
                  City <span className="text-danger">*</span>
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={data.city}
                  onChange={onChange}
                  placeholder="City"
                  required
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">
                  State <span className="text-danger">*</span>
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="state"
                  value={data.state}
                  onChange={onChange}
                  placeholder="State"
                  required
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">
                  Postal Code <span className="text-danger">*</span>
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="postalCode"
                  value={data.postalCode}
                  onChange={onChange}
                  placeholder="Postal Code"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingAddress;
