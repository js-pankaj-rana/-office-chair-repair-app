"use client";

import React, { useEffect } from "react";
import { Badge, Button, Table } from "react-bootstrap";

import { useGetAllOrderQuery } from "@/redux/api/orderApi";
import Loader from "../layout/Loader";
import { useRouter } from "next/navigation";

export interface IOrder {
  _id: string;
  faultDescription: string;
  orderStatus: string;
  quantityOrdered: number;
  scheduleDate: string;
  productImages: {
    public_id: string;
    url: string;
  }[];
  shippingAddress: {
    addressLine1: string;
    city: string;
    postalCode: string;
  };
}

export default function OrderList() {
  const { data: orderResponseData, isLoading } = useGetAllOrderQuery();

  const getStatusVariant = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "success";
      case "cancelled":
        return "danger";
      case "pending":
        return "warning";
      case "processing":
        return "info";
      default:
        return "secondary";
    }
  };

  const formattedDate = (scheduleDate: string) =>
    new Date(scheduleDate).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const trimText = (text?: string, len = 40) => {
    if (!text) return "-";
    return text.length > len ? `${text.slice(0, len)}...` : text;
  };
  const router = useRouter();

  return (
    <div className="container pt-4">
      <h3 className="mb-4">Your order details</h3>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="table-responsive">
          <Table hover className="align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Fault Description</th>
                <th>Status</th>
                <th>Qty</th>
                <th>Schedule Date</th>
                <th>Shipping Address</th>
                <th>Images</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orderResponseData &&
                orderResponseData?.data?.map(
                  (
                    {
                      _id,
                      faultDescription,
                      orderStatus,
                      quantityOrdered,
                      shippingAddress,
                      scheduleDate,
                      productImages,
                    }: IOrder,
                    ind: number
                  ) => (
                    <tr key={_id}>
                      <td className="fw-semibold">{ind + 1}</td>

                      <td style={{ minWidth: 220 }}>
                        {trimText(faultDescription)}
                      </td>

                      <td>
                        <Badge bg={getStatusVariant(orderStatus)}>
                          {orderStatus}
                        </Badge>
                      </td>

                      <td>{quantityOrdered}</td>

                      <td>{formattedDate(scheduleDate)}</td>

                      <td style={{ minWidth: 250 }}>
                        <div className="text-muted small">
                          {shippingAddress.addressLine1},
                          <br />
                          {shippingAddress.city} - {shippingAddress.postalCode}
                        </div>
                      </td>

                      <td>
                        <Badge bg="secondary">{productImages.length}</Badge>
                      </td>

                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => router.push(`/order/${_id}`)}
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}
