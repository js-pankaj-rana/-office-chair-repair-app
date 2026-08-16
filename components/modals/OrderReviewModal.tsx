"use client";

import { Button, Modal } from "react-bootstrap";
import ImageCarousel from "../admin/ImageCarousel";
import { IOrderDetail } from "@/backend/models/orderdetails";
import React, { useState, useMemo, useEffect } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "@/app/bookingTimeline.css";
import { SingleAddress } from "../order/SingleAddress";
import { useGenrateInvoiceAdminMutation } from "@/redux/api/orderApi";

import { useCreateInvoiceMutation } from "@/redux/api/invoiceApi";

import toast from "react-hot-toast";
import { OrderEstimation } from "../order/OrderEstimation";
import { useRouter } from "next/navigation";
import InvoiceEmail from "../invoice/InvoiceEmail";
import {
  calculateEstimate,
  checkIgstOrSgst,
  handleFieldClassName,
} from "@/helpers/utils";
import {
  IFieldConfig,
  ORDER_ESTIMATION_FIELDS,
} from "@/constants/formConstant";
import { DeleteImagePayload } from "../admin/AllBookings";

interface Props {
  show: boolean;
  onClose: () => void;
  onDelete: (params: DeleteImagePayload) => void;
  order: IOrderDetail;
  isImgDeleting: boolean;
  deleteImgError: string;
  isImgDeleteSuccess: boolean;
}

export interface IVisitingTime {
  minTime: Date | null;
  maxTime: Date | null;
}

const OrderReviewModal: React.FC<Props> = ({
  show,
  onClose,
  order,
  onDelete,
  isImgDeleting,
  deleteImgError,
  isImgDeleteSuccess,
}) => {
  const router = useRouter();
  const [genrateInvoiceAdmin, { isLoading, isSuccess, error }] =
    useGenrateInvoiceAdminMutation();

  const [
    createInvoice,
    { isLoading: isCILoading, isSuccess: isCISuccess, error: ciError },
  ] = useCreateInvoiceMutation();

  const [isShowInvoice, setIsShowInvoice] = useState(
    false || order.orderStatus === "Verified"
  );

  const {
    productImages,
    scheduleDate,
    createdAt,
    orderStatus,
    quantityOrdered,
    shippingAddress,
    billingAddress,
    _id: orderId,
    user,
  } = order;

  // const newBillingAddress = Object.assign({
  //   ...billingAddress, {}
  // });

  const minDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate());
    return date;
  }, []);

  const maxDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 30); // 7 + 30
    return date;
  }, []);

  const [servicingDate, setServicingDate] = useState<Date | null>(scheduleDate);

  const [visitingTime, setVisitingTime] = useState<IVisitingTime>({
    minTime: minDate,
    maxTime: minDate,
  });
  const [dateError, setDateError] = useState("");
  const [toggleDateDisable, setToggleDateDisable] = useState(true);
  const [currentFormIndex, setCurrentFormIndex] = useState<number>(0);
  const initialEstimationObj = {
    gstPercentage: 18,
    cgst: 0,
    sgst: 0,
    igst: 0,
    totalPrice: 0,
    description: "Office Chair Repair Service",
    rate: 0,
    unit: 1,
    HsnSacCode: "998724",
  };

  const initialPlatformFeeObj = {
    gstPercentage: 18,
    cgst: 22.5,
    sgst: 22.5,
    igst: 45.0,
    totalPrice: 295.0,
    description: "IT/software platform service",
    rate: 250,
    unit: 1,
    HsnSacCode: "998314",
  };

  const [estimations, setEstimations] = useState([
    {
      id: new Date().getTime(),
      estimatePrice: initialEstimationObj,
    },
    {
      id: new Date().getTime() + 1,
      estimatePrice: initialPlatformFeeObj,
    },
  ]);

  const addEstimation = () => {
    setEstimations((prev) => [
      ...prev,
      {
        id: new Date().getTime(),
        estimatePrice: initialEstimationObj,
      },
    ]);
  };

  const removeEstimation = (id: number) => {
    if (estimations.length > 1) {
      setEstimations((prev) => prev.filter((item) => item.id !== id));
      setCurrentFormIndex(0);
    } else {
      toast.error("Deletion failed. A minimum of one record is required.");
    }
  };

  useEffect(() => {
    const currentFormObj = estimations[currentFormIndex];
    const { estimatePrice } = currentFormObj;

    const calcGstData = calculateEstimate(
      estimatePrice.rate,
      estimatePrice.unit,
      estimatePrice.gstPercentage,
      "Jharkhand",
      billingAddress.state
    );

    // @ts-ignore
    setEstimations((prev) => {
      return prev.map((item, index) =>
        index === currentFormIndex
          ? {
              ...item,
              estimatePrice: {
                ...item.estimatePrice,
                ...calcGstData,
              },
            }
          : item
      );
    });
  }, [
    estimations[currentFormIndex].estimatePrice.cgst,
    estimations[currentFormIndex].estimatePrice.sgst,
    estimations[currentFormIndex].estimatePrice.igst,
    estimations[currentFormIndex].estimatePrice.rate,
    estimations[currentFormIndex].estimatePrice.unit,
  ]);

  const handleNavigate = () => {
    if (order._id) {
      const estimateCollection = estimations.map((estimate) => {
        const { id: _id, estimatePrice } = estimate;
        return estimatePrice;
      });
      const reqPayloadInvoice = {
        orderDetail: order._id,
        invoice: [...estimateCollection],
      };

      if (scheduleDate.toString() !== servicingDate.toString()) {
        const reqPayloadInvoieAdmin = {
          id: order._id,
          servicingDate,
        };
        genrateInvoiceAdmin(reqPayloadInvoieAdmin);
      }
      createInvoice(reqPayloadInvoice);
    }
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

  const handleScheduleDate = () => {
    setToggleDateDisable(!toggleDateDisable);
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

  useEffect(() => {
    if (isCISuccess) {
      toast.success("Invoice generated and sent successfully.");
      router.push(`/admin/invoice/${order._id}`);
      onClose();
    }
    if (ciError) {
      // @ts-ignore
      toast.error(ciError?.message);
    }
  }, [isCISuccess, ciError]);

  const handleEstimateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string | number
  ) => {
    if (e.currentTarget?.value) {
      const { value, name } = e.currentTarget;
      estimations.forEach((item, index) => {
        if (item.id === id) {
          setCurrentFormIndex(index);
        }
      });

      setEstimations((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                estimatePrice: {
                  ...item.estimatePrice,
                  // @ts-ignore
                  [name]: isNaN(value) ? value : Number(value),
                },
              }
            : item
        )
      );
    }
  };

  const FILTER_ORDER_ESTIMATION_FIELDS = checkIgstOrSgst(
    ORDER_ESTIMATION_FIELDS,
    // @ts-ignore
    billingAddress.state,
    "Jharkhand"
  );

  return (
    <Modal
      show={show}
      fullscreen
      onHide={onClose}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body>
        {!isShowInvoice ? (
          <div className="container">
            <h4 className="fw-semibold mb-3">Order Review</h4>
            <div className="row">
              <div className="col-lg-8">
                <h5 className="fw-semibold mb-3 text-primary">Images Review</h5>
                {productImages && (
                  <ImageCarousel
                    images={productImages}
                    onDelete={onDelete}
                    isImgDeleting={isImgDeleting}
                    orderId={orderId}
                    orderStatus={orderStatus}
                  />
                )}
              </div>

              <div className="col-lg-4 mt-3">
                <h5 className="fw-semibold mb-3 text-primary">
                  Address review
                </h5>
                <div className="mt-4">
                  <div>
                    <h4 className="form-label fw-bold">Servicing Address</h4>
                    <SingleAddress address={shippingAddress} />
                  </div>
                  <div>
                    <h4 className="form-label fw-bold mt-4">Billing Address</h4>
                    <SingleAddress address={billingAddress} />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12">
                <h5 className="fw-semibold mb-3 text-primary">Order Details</h5>
                <div className="row">
                  {orderStatus && (
                    <div className="col-md-1">
                      <label className="form-label">Order Status</label> <br />
                      <input
                        className="form-control"
                        type="text"
                        value={orderStatus}
                        disabled
                      />
                    </div>
                  )}
                  {quantityOrdered && (
                    <div className="col-md-1">
                      <label className="form-label">Quantity</label> <br />
                      <input
                        className="form-control"
                        type="text"
                        value={quantityOrdered}
                        disabled
                      />
                    </div>
                  )}

                  {createdAt && (
                    <div className="col-md-2">
                      <label className="form-label">Created Date</label> <br />
                      <input
                        className="form-control"
                        type="text"
                        value={moment(createdAt).format("DD-MM-YYYY HH:MM")}
                        readOnly
                      />
                    </div>
                  )}

                  {scheduleDate && (
                    <>
                      <div className="col-md-8">
                        <label className="form-label">Schedule Date</label>
                        <div className="d-flex gap-2">
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
                          <button
                            className="btn btn-primary"
                            onClick={handleScheduleDate}
                          >
                            {toggleDateDisable ? "Edit" : "Save"}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="row">
                  <div className="col-12 mt-5">
                    <h5 className="fw-semibold mb-3 text-primary">
                      Work Estimated Amount
                    </h5>
                    <div className="row">
                      {FILTER_ORDER_ESTIMATION_FIELDS.map(
                        ({ label, name }: IFieldConfig) => (
                          <div
                            key={`i-${name}`}
                            className={`${handleFieldClassName(name)}`}
                          >
                            {label}
                          </div>
                        )
                      )}
                    </div>
                    {estimations.map((item) => (
                      <div className="row" key={item.id}>
                        <OrderEstimation
                          formId={item.id}
                          removeEstimation={removeEstimation}
                          estimatePrice={item.estimatePrice}
                          handleChange={handleEstimateChange}
                          billingState={billingAddress.state}
                          businessState="Jharkhand"
                          orderStatus={orderStatus}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 text-center">
                    <Button onClick={addEstimation} className="btn btn-success">
                      Add Estimation
                    </Button>{" "}
                    &nbsp;
                    <Button onClick={handleNavigate} className="btn btn-danger">
                      Generate
                    </Button>{" "}
                    &nbsp;
                    <Button onClick={onClose} className="btn btn-danger">
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <InvoiceEmail />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default OrderReviewModal;
