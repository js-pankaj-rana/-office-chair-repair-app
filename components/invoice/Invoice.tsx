"use client";

import React, { useEffect, useRef } from "react";

import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
import InvoiceHeader from "./InvoiceHeader";
import { useLazyGetOrderByIdAdminQuery } from "@/redux/api/orderApi";
import {
  useLazyGetInvoiceByOrderQuery,
  useUploadInvoiceMutation,
} from "@/redux/api/invoiceApi";

import { useParams, useRouter } from "next/navigation";
import { skipToken } from "@reduxjs/toolkit/query";
import InvoiceDetails from "./InvoiceDetails";
import CustomerDetails from "./CustomerDetails";
import toast from "react-hot-toast";
import Loader from "../layout/Loader";

export interface InvoiceItem {
  description: string;
  specification?: string;
  hsn: string;
  quantity: number;
  unit: string;
  rate: number;
  taxableValue: number;
  gst: number;
  gstAmount: number;
  total: number;
}

export interface Customer {
  name: string;
  address: string;
  phone: string;
  gstin: string;
  placeOfSupply: string;
}

export interface Company {
  logo: string;
  companyName: string;
  address: string;
  phone: string;
  website: string;
  email: string;
  gstin: string;
}

export interface Invoice {
  invoiceNo: string;
  invoiceDate: string;
  lrNo: string;
  transport: string;
  transportId: string;
  vehicleNo: string;
  reverseCharge: string;
}

interface InvoiceProps {
  company: Company;
  customer: Customer;
  invoice: Invoice;
  items: InvoiceItem[];
}

const Invoice = () => {
  const params = useParams();
  const id = params.id as string;
  const docRef = useRef(null);

  const router = useRouter();
  const [getOrder, { data }] = useLazyGetOrderByIdAdminQuery(
    // @ts-ignore
    id ? id : skipToken
  );

  const [
    uploadInvoice,
    {
      data: uploadInvoiceData,
      isLoading: isUploading,
      error: uploadInvoiceError,
    },
  ] = useUploadInvoiceMutation();

  const [
    getInvoiceByOrder,
    { data: invoiceData, isLoading: isInvoiceLoading },
  ] = useLazyGetInvoiceByOrderQuery(
    // @ts-ignore
    id ? id : skipToken
  );

  const sendEmailAndUploadInvoice = () => {
    const input = docRef?.current;
    if (input) {
      html2canvas(input, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#fff",
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");

        // const pdf = new jsPDF();
        // const pdfWidth = pdf.internal.pageSize.getWidth();
        // pdf.addImage(imgData, 0, 0, pdfWidth, 0);
        // pdf.save(`quotation_${id}.pdf`);

        const reqPayload = {
          id,
          body: {
            images: [{ file: imgData, preveiw: undefined }],
          },
        };
        uploadInvoice(reqPayload);
      });
    }
  };

  useEffect(() => {
    if (id) {
      getOrder(id);
      getInvoiceByOrder(id);
    }
  }, [id, getOrder, getInvoiceByOrder]);

  useEffect(() => {
    let timeOut = undefined;
    console.log("====>>>>", invoiceData);
    if (uploadInvoiceError) {
      // @ts-ignore
      toast.error(uploadInvoiceError.data.message);
    }
    if (uploadInvoiceData) {
      toast.success(uploadInvoiceData.data.message);
      timeOut = setTimeout(() => {
        timeOut = router.push("/admin/bookings");
      }, 1000);
    }
    return () => {
      clearTimeout(timeOut);
    };
  }, [uploadInvoiceData, uploadInvoiceError, invoiceData]);

  return (
    <>
      {data && invoiceData ? (
        <>
          <div className="text-end">
            <button
              className="btn btn-brand text-white"
              disabled={isUploading}
              onClick={sendEmailAndUploadInvoice}
            >
              Generate Invoice and Send Email to Customer
            </button>
          </div>

          {isUploading ? (
            <Loader />
          ) : (
            <div className="container-fluid p-0 invoice-wrap mb-5" ref={docRef}>
              <InvoiceHeader />
              <CustomerDetails
                shippingAddress={invoiceData.data.orderDetail.shippingAddress}
                billingAddress={invoiceData.data.orderDetail.billingAddress}
                orderNumber={invoiceData.data.orderDetail.orderNumber}
                gstin={invoiceData.data?.orderDetail.gstin}
              />
              <InvoiceDetails invoiceData={invoiceData?.data} />
            </div>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Invoice;
