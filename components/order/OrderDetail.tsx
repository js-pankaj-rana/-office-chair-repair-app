"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useGetOrderByIdQuery } from "@/redux/api/orderApi";
import Link from "next/link";
import { SingleAddress } from "./SingleAddress";

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

interface IProps {
  id: string;
}

const OrderDetail = ({ id }: IProps) => {
  const router = useRouter();

  const {
    data: response,
    isLoading: isOrderLoading,
    refetch,
  } = useGetOrderByIdQuery(id);
  const order = response?.data;

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      {isOrderLoading ? (
        "Loading....."
      ) : (
        <div className="container py-4">
          <div className="row">
            <div className="col-md-8">
              <div className="d-flex justify-content-between mb-4">
                <h3 className="mb-0">Order Details</h3>

                <Link
                  className="d-flex align-items-start align-items-center mb-2"
                  href="/orders"
                >
                  <Image
                    alt="svg-img"
                    width="32"
                    height="32"
                    src="/lineLeftArrow.svg"
                  />
                  <span>Back</span>
                </Link>
              </div>

              {order && (
                <div className="card-body">
                  <div className="row gy-3">
                    <div className="col-md-6">
                      <strong>Order ID</strong>
                      <p className="mb-0">{order._id}</p>
                    </div>

                    <div className="col-md-6">
                      <strong>Status</strong>
                      <p className="mb-0">{order.orderStatus}</p>
                    </div>

                    <div className="col-md-6">
                      <strong>Quantity Ordered</strong>
                      <p className="mb-0">{order.quantityOrdered}</p>
                    </div>

                    <div className="col-md-6">
                      <strong>Schedule Date</strong>
                      <p className="mb-0">
                        {new Date(order.scheduleDate).toLocaleString()}
                      </p>
                    </div>

                    {order.faultDescription && (
                      <div className="col-12">
                        <strong>Fault Description</strong>
                        <p className="mb-0">{order.faultDescription}</p>
                      </div>
                    )}

                    <div className="col-12">
                      <div className="row">
                        {order &&
                          order.shippingAddress &&
                          order?.shippingAddress?.addressLine1 && (
                            <div className="col-md-6">
                              <strong>Shipping Address</strong>
                              <SingleAddress address={order.shippingAddress} />
                            </div>
                          )}
                        {order &&
                          order.billingAddress &&
                          order?.billingAddress?.addressLine1 && (
                            <div className="col-md-6">
                              <strong>Billing Address</strong>
                              <SingleAddress address={order.billingAddress} />
                            </div>
                          )}
                      </div>
                    </div>

                    <div className="col-12">
                      <strong>Product Images</strong>

                      {order?.productImages?.length ? (
                        <div className="row g-3 mt-2">
                          {order.productImages.map((image) => {
                            if (!image.url) {
                              return;
                            }
                            return (
                              <div
                                className="col-6 col-sm-4 col-md-3 col-lg-2"
                                key={image.public_id}
                              >
                                <div className="card">
                                  <Image
                                    src={image.url}
                                    alt="Product"
                                    className="card-img-top"
                                    width={180}
                                    height={180}
                                    style={{
                                      height: "180px",
                                      objectFit: "cover",
                                    }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-muted mt-2">No images available.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="col-md-4"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetail;
