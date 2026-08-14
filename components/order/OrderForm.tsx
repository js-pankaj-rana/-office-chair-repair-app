"use client";

import React, { useState, useMemo, useEffect } from "react";
import DatePicker from "react-datepicker";
import type { RootState } from "@/redux/store.ts";
import { useSelector } from "react-redux";
import AddressCard from "./AddressCard";
import "react-datepicker/dist/react-datepicker.css";
import ButtonLoader from "../layout/ButtonLoader";
import { IImage, IOrderStatus, IPayment } from "@/backend/models/orderdetails";
import UploadImages from "./UploadImages";
import { SingleAddress } from "./SingleAddress";
import BillingAddress, { BillingAddressData } from "./BillingAddress";
import EditBillingAddress from "./EditBillingAddress";

interface Props {
  handleSubmit: (any) => void;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | Element>
  ) => void;
  isLoading: boolean;
  submitButtonLabel: string;
  formTitle: string;
  type: "create" | "edit" | "view";
  booking: BookingForm;
}

export interface IVisitingTime {
  minTime: Date | null;
  maxTime: Date | null;
}

interface BookingForm {
  productImages?: IImage[];
  orderNumber: number;
  orderStatus?: IOrderStatus;
  scheduleDate?: Date;
  scheduleTime?: string;
  serviceCode?: string;
  paymentInfo?: IPayment[];
  faultDescription: string;
  quantityOrdered: number;
  orderEstimatedPrice?: number;
}

export interface ImageItem {
  file: File;
  preview: string;
  path?: string;
}

const OrderForm = ({
  handleSubmit,
  handleChange,
  isLoading,
  submitButtonLabel,
  formTitle,
  type,
  booking,
}: Props) => {
  const addresses = useSelector(
    (state: RootState) => state.auth?.user?.address
  );

  const [images, setImages] = useState<string[]>([]);

  const minDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date;
  }, []);

  const maxDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 37); // 7 + 30
    return date;
  }, []);

  const [servicingDate, setServicingDate] = useState<Date | null>(minDate);
  const [visitingTime, setVisitingTime] = useState<IVisitingTime>({
    minTime: minDate,
    maxTime: minDate,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dateError, setDateError] = useState("");
  const [isBillingAddress, setIsBillingAddress] = useState(false);

  const [imagesError, setImagesError] = useState("");

  const [billingAddress, setBillingAddress] = useState<BillingAddressData>({
    billingName: "",
    gstin: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const [sameAsShipping, setSameAsShipping] = useState(true);

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setBillingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateVisitingTime = (date: Date | null): string => {
    if (!date) return "Please select a date and time.";

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const totalMinutes = hours * 60 + minutes;

    const minMinutes = 9 * 60; // 09:00
    const maxMinutes = 18 * 60; // 18:00

    if (totalMinutes < minMinutes) {
      return "Visiting time cannot be before 9:00 AM.";
    }

    if (totalMinutes > maxMinutes) {
      return "Visiting time cannot be after 6:00 PM.";
    }

    return "";
  };

  const validateImagesLength = (images: string[]): string => {
    if (images.length === 0) return "Please upload minimum 1 product images";
    if (images.length > 5) return "You can upload maximum 5 product images";
    return "";
  };

  const onDateChange = (date: Date | null) => {
    if (!date) return;

    const errorMessage = validateVisitingTime(date);

    if (errorMessage) {
      setDateError(errorMessage);
    } else {
      setDateError("");
    }

    setServicingDate(date);

    const minTime = new Date(date);
    minTime.setHours(9, 0, 0, 0);

    const maxTime = new Date(date);
    maxTime.setHours(18, 0, 0, 0);

    setVisitingTime({
      minTime,
      maxTime,
    });
  };

  const customHandleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const errorVisitMessage = validateVisitingTime(servicingDate);

    if (errorVisitMessage) {
      setDateError(errorVisitMessage);
      return;
    } else {
      setDateError("");
    }

    const errorImageMessage = validateImagesLength(images);
    if (errorImageMessage) {
      setImagesError(errorImageMessage);
      return;
    } else {
      setImagesError("");
    }

    const address = addresses[selectedIndex];

    const { _id, isDefault, ...addressData } = address;

    const reqPayload = {
      ...booking,
      scheduleDate: servicingDate,
      shippingAddress: addressData,
      billingAddress,
      images,
    };
    handleSubmit(reqPayload);
  };

  const updateBillingSameAsDefault = (value: boolean) => {
    if (value) {
      setBillingAddress({ ...addresses[selectedIndex] });
    }
    setSameAsShipping(value);
  };

  useEffect(() => {
    if (addresses?.length) {
      setSelectedIndex(
        Math.max(
          addresses.findIndex(({ isDefault }) => isDefault),
          0
        )
      );
      const billingAddress = addresses[selectedIndex];
      setBillingAddress((prev) => ({
        ...prev,
        ...billingAddress,
      }));
    }
  }, [addresses]);

  return (
    <div className="container py-5">
      <div className="card">
        <h3 className="mb-3">{formTitle}</h3>
        <div className="card-body">
          {isBillingAddress ? (
            <EditBillingAddress
              billingAddress={billingAddress}
              shippingAddress={addresses[selectedIndex]}
              setSameAsShipping={setSameAsShipping}
              sameAsShipping={sameAsShipping}
              handleBillingChange={handleBillingChange}
              setIsBillingAddress={setIsBillingAddress}
            />
          ) : (
            <form
              onSubmit={customHandleSubmit}
              className={isBillingAddress ? "d-none" : ""}
            >
              <div className="container">
                <div className="row">
                  {type !== "create" && (
                    <div className="col-md-6">
                      <label className="form-label">Order Number</label>
                      <input
                        type="text"
                        className="form-control"
                        value={booking.orderNumber}
                        readOnly
                      />
                    </div>
                  )}
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-6">
                        <label className="form-label">Order Status</label>
                        <input
                          type="text"
                          className="form-control"
                          value={booking.orderStatus}
                          disabled
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Schedule Date</label>
                        <br />
                        <DatePicker
                          className="form-control"
                          selected={servicingDate}
                          onChange={onDateChange}
                          minDate={minDate}
                          maxDate={maxDate}
                          showTimeSelect
                          minTime={visitingTime.minTime}
                          maxTime={visitingTime.maxTime}
                          dateFormat="dd/MM/yyyy HH:mm"
                        />
                        {dateError && (
                          <div className="text-danger mt-1">{dateError}</div>
                        )}
                      </div>
                      <div className="col-md-6 mt-3">
                        <label className="form-label">
                          No of product (eg. Chair)
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="quantityOrdered"
                          min={1}
                          value={booking.quantityOrdered}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      {type !== "create" && (
                        <div className="col-md-6 mt-3">
                          <label className="form-label">Service Code</label>
                          <input
                            type="text"
                            className="form-control"
                            value={booking.serviceCode}
                            disabled
                          />
                        </div>
                      )}
                      {
                        type !== "create" && null
                        // <div className="col-md-6">
                        //   <label className="form-label">Payment Info</label>
                        //   <input
                        //     type="text"
                        //     className="form-control"
                        //     value={booking?.paymentInfo?.status}
                        //     readOnly
                        //   />
                        // </div>
                      }

                      <div className="col-md-6 mt-3">
                        <label className="form-label">
                          Product fault description (optional)
                        </label>
                        <textarea
                          className="form-control"
                          value={booking.faultDescription}
                          name="faultDescription"
                          rows={2}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          {addresses && addresses?.length > 0 ? (
                            <AddressCard
                              addressProps={{
                                addresses,
                                selectedIndex,
                                setSelectedIndex,
                              }}
                            />
                          ) : (
                            "Loading..."
                          )}
                        </div>

                        <div className="col-md-6">
                          <div className="d-flex justify-content-between align-items-start my-3">
                            <h6 className="mb-0">Billing Address</h6>
                            {billingAddress.addressLine1 && (
                              <button
                                className="btn btn-link p-0 text-decoration-none"
                                onClick={() => setIsBillingAddress(true)}
                              >
                                Edit
                              </button>
                            )}
                          </div>
                          {billingAddress.addressLine1 && (
                            <SingleAddress address={billingAddress} />
                          )}
                        </div>
                      </div>

                      {type !== "create" && (
                        <div className="col-md-6">
                          <label className="form-label">Estimated Price</label>
                          <input
                            type="number"
                            className="form-control"
                            value={booking.orderEstimatedPrice}
                            readOnly
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <label className="form-label">
                        Upload product images
                      </label>
                      <UploadImages
                        imgProps={{
                          images,
                          setImages,
                        }}
                      />
                      {imagesError && (
                        <div className="text-danger mt-1">{imagesError}</div>
                      )}
                    </div>
                  </div>

                  <div className="col-md-12 mt-5 text-center">
                    <button
                      className="btn btn-brand text-white btn-lg px-3"
                      disabled={isLoading}
                    >
                      {isLoading ? <ButtonLoader /> : submitButtonLabel}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
