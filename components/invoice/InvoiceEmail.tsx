"use client";

import React, { useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { IOrderDetail } from "@/backend/models/orderdetails";
import moment from "moment";
import { SingleAddress } from "../order/SingleAddress";
import { useParams } from "next/navigation";
import { useLazyGetOrderByIdAdminQuery } from "@/redux/api/orderApi";
import { skipToken } from "@reduxjs/toolkit/query";
import Loader from "../layout/Loader";

interface Props {
  orderData: IOrderDetail;
}
const currency = (amount: number) =>
  `₹${amount?.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const InvoiceEmail = () => {
  const params = useParams();
  const id = params.id as string;

  const docRef = useRef(null);

  const [getOrder, { data, isLoading }] = useLazyGetOrderByIdAdminQuery(
    // @ts-ignore
    id ? id : skipToken
  );

  const handleDownload = () => {
    const input = docRef?.current;
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const pdfWidth = pdf.internal.pageSize.getWidth();
        pdf.addImage(imgData, 0, 0, pdfWidth, 0);
        pdf.save(`invoice_${data?.data?.orderNumber}.pdf`);
      });
    }
  };

  useEffect(() => {
    if (id) {
      getOrder(id);
    }
  }, [id, getOrder]);

  return (
    <>
      <button className="btn btn-success col-md-5" onClick={handleDownload}>
        Download Invoice
      </button>

      <div className="container py-5 bg-light">
        <div className="card shadow mx-auto border-0" style={{ maxWidth: 800 }}>
          {/* Header */}

          <div className="card-header bg-primary text-white p-4">
            <h2 className="mb-1">Rajesh Enterprise</h2>
            <p className="mb-0">Thank you for choosing our repair service.</p>
          </div>

          {!isLoading ? (
            <div className="card-body p-4" ref={docRef}>
              {/* Invoice */}

              <div className="row mb-4">
                <div className="col">
                  <h5 className="fw-bold">Invoice</h5>

                  <p className="mb-1">
                    <strong>Invoice No:</strong>{" "}
                    {data?.data?.order?.orderNumber}
                  </p>

                  <p className="mb-0">
                    <strong>Date:</strong> {moment().format("DD-MM-YYYY HH:MM")}
                  </p>
                </div>
              </div>

              <hr />

              {/* Customer */}

              <h5 className="mb-3">Customer Details</h5>

              <div className="row">
                <div className="col-md-6">
                  <p>
                    <strong>Name:</strong>
                    <br />
                    {data?.data?.order?.user?.name}
                  </p>

                  <p>
                    <strong>Email:</strong>
                    <br />
                    {data?.data?.order?.user?.email}
                  </p>
                </div>

                <div className="col-md-6">
                  <p>
                    <strong>Phone:</strong>
                    <br />
                    {data?.data?.order?.user?.phone}
                  </p>
                  <div className="row">
                    {data?.data?.order?.billingAddress && (
                      <>
                        <div className="col-md-6">
                          <strong>Billing Address:</strong>
                          <br />
                          <SingleAddress
                            address={data?.data?.order?.billingAddress}
                          />
                        </div>

                        <div className="col-md-6">
                          <strong>Servicing Address:</strong>
                          <br />
                          <SingleAddress
                            address={data?.data?.order?.shippingAddress}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <hr />

              {/* Service */}

              <h5 className="mb-3">Service Summary</h5>

              <table className="table table-bordered align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Description</th>
                    <th className="text-end">Amount</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>{data?.data?.workService?.description}</td>
                    <td className="text-end">
                      {currency(
                        data?.data?.order?.orderEstimatedPrice?.servicing
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td>Platform Fee</td>
                    <td className="text-end">
                      {currency(
                        data?.data?.order?.orderEstimatedPrice?.platformFee
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td>CGST</td>
                    <td className="text-end">
                      {currency(data?.data?.order?.orderEstimatedPrice?.cgst)}
                    </td>
                  </tr>

                  <tr>
                    <td>SGST</td>
                    <td className="text-end">
                      {currency(data?.data?.order?.orderEstimatedPrice?.sgst)}
                    </td>
                  </tr>

                  {data?.data?.order?.orderEstimatedPrice?.igst > 0 && (
                    <tr>
                      <td>IGST</td>
                      <td className="text-end">
                        {currency(data?.data?.order?.orderEstimatedPrice?.igst)}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Payment Summary */}

              <div className="row justify-content-end">
                <div className="col-md-6">
                  <table className="table">
                    <tbody>
                      <tr>
                        <th>Total Amount</th>
                        <td className="text-end fw-bold">
                          {currency(
                            data?.data?.order?.orderEstimatedPrice?.totalPrice
                          )}
                        </td>
                      </tr>

                      <tr>
                        <th>Advance Paid</th>
                        <td className="text-end text-success">
                          {currency(
                            data?.data?.order?.orderEstimatedPrice
                              ?.minBookingPrice
                          )}
                        </td>
                      </tr>

                      <tr className="table-warning">
                        <th>Balance Due</th>
                        <td className="text-end text-danger fw-bold fs-5">
                          {currency(
                            data?.data?.order?.orderEstimatedPrice?.balancePrice
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Alert */}

              {/* <div className="alert alert-success mt-4">
              <strong>Payment Status:</strong> Advance Paid
            </div>

            <div className="alert alert-warning">
              The remaining balance can be paid after the technician completes
              the service.
            </div>

            <div className="text-center mt-4">
              <button className="btn btn-primary px-4">View Booking</button>
            </div> */}
            </div>
          ) : (
            <Loader />
          )}

          {/* Footer */}

          <div className="card-footer text-center bg-dark text-white py-4">
            <h5>ZHelps Chair Servicing</h5>

            <p className="mb-1">0326 3564104</p>

            <p className="mb-1">admin@zhelps.in</p>

            <p className="mb-3">www.zhelps.in</p>

            <small className="text-white-50">
              This is a system-generated invoice and does not require a
              signature.
            </small>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceEmail;
