"use client";

import React, { useState } from "react";
import { IOrderDetail } from "@/backend/models/orderdetails";
import {
  useDeleteProductImageMutation,
  useGetAllOrderAdminQuery,
} from "@/redux/api/orderApi";
import { MDBDataTable } from "mdbreact";
import { toast } from "react-hot-toast";
import moment from "moment";
import OrderReviewModal from "@/components/modals/OrderReviewModal";

export interface DeleteImagePayload {
  orderId: string;
  body: {
    public_id: string;
  };
}

const AllBookings = () => {
  const [show, setShow] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<IOrderDetail | null>(null);

  const [
    deleteProductImage,
    {
      error: deleteImgError,
      isLoading: isImgDeleting,
      isSuccess: isImgDeleteSuccess,
    },
  ] = useDeleteProductImageMutation();

  const onClose = () => {
    setShow(false);
  };

  const { data: bookings, isLoading, refetch } = useGetAllOrderAdminQuery();

  const onImageDelete = (reqPayload: DeleteImagePayload) => {
    deleteProductImage(reqPayload);
    refetch();
    setShow(false);
  };

  if (isLoading) {
    return <p>Loading booking...</p>;
  }

  const setBookings = () => {
    const data: { columns: any[]; rows: any[] } = {
      columns: [
        {
          label: "OrderID",
          field: "id",
        },
        {
          label: "UserID",
          field: "user",
        },
        {
          label: "QTY",
          field: "quantityOrdered",
        },
        {
          label: "Schedule",
          field: "scheduleDate",
        },
        {
          label: "Booking",
          field: "createdAt",
          sort: "asc",
        },
        {
          label: "imageCount",
          field: "imageCount",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    // @ts-ignore
    bookings?.data?.forEach((booking: IOrderDetail) => {
      const {
        scheduleDate,
        productImages,
        user,
        _id,
        quantityOrdered,
        createdAt,
      } = booking;

      data?.rows?.push({
        id: _id,
        imageCount: productImages?.length,
        scheduleDate: moment(scheduleDate).format("DD-MM-YYYY"),
        createdAt: moment(createdAt).format("DD-MM-YYYY"),
        user,
        quantityOrdered,

        actions: (
          <>
            <button
              className="btn btn-outline-danger mx-2"
              disabled={isLoading}
              onClick={() => {
                handleReviewOrder(booking);
              }}
            >
              Review
            </button>
          </>
        ),
      });
    });

    return data;
  };

  const handleReviewOrder = (order: IOrderDetail) => {
    setShow(true);
    setCurrentOrder(order);
  };

  return (
    <>
      {currentOrder && (
        <OrderReviewModal
          onClose={onClose}
          show={show}
          order={currentOrder}
          onDelete={onImageDelete}
          isImgDeleting={isImgDeleting}
          //@ts-ignore
          deleteImgError={deleteImgError ?? "Something went wrong"}
          isImgDeleteSuccess={isImgDeleteSuccess}
        />
      )}
      <div className="container">
        <h5 className="my-3 text-primary">{bookings?.length} Bookings</h5>
        <MDBDataTable
          data={setBookings()}
          className="px-3"
          bordered
          striped
          hover
        />
      </div>
    </>
  );
};

export default AllBookings;
