"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Carousel, Button } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import toast from "react-hot-toast";

export interface IProductImage {
  _id: string;
  public_id: string;
  url: string;
}

interface Props {
  images: IProductImage[];
  onDelete: (image: IProductImage) => void;
  isImgDeleting: boolean;
  deleteImgError: string;
  isImgDeleteSuccess: boolean;
  orderId: unknown | string;
  orderStatus: "Start" | "Initiated" | "Verified" | "Cancelled" | "Successful";
}

export default function ImageCarousel({
  images,
  onDelete,
  isImgDeleting,
  deleteImgError,
  isImgDeleteSuccess,
  orderId,
  orderStatus,
}: Props) {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div
        className="border rounded d-flex align-items-center justify-content-center"
        style={{ height: 500 }}
      >
        No Images Available
      </div>
    );
  }

  const handleDelete = (public_id: string) => {
    const reqPayload = {
      orderId,
      body: {
        public_id,
      },
    };
    onDelete(reqPayload);
  };
  // deleteImgError && toast.error(deleteImgError);
  // isImgDeleteSuccess && toast.success("Images has been deleted.");

  return (
    <Carousel
      activeIndex={index}
      onSelect={(selectedIndex) => setIndex(selectedIndex)}
      interval={null}
      indicators={images.length > 1}
      controls={images.length > 1}
    >
      {images.map((image) => {
        if (!image.url) {
          return;
        }
        return (
          <Carousel.Item key={image._id}>
            <div className="position-relative">
              <div className="product-images">
                <Image
                  src={image.url}
                  alt="Product"
                  className="w-100 rounded"
                  height={orderStatus === "Verified" ? 100 : 500}
                  width={orderStatus === "Verified" ? 150 : 800}
                  style={{
                    objectFit: "contain",
                    background: "#131313",
                  }}
                />

                <Button
                  variant="danger"
                  size="sm"
                  disabled={isImgDeleting}
                  className="position-absolute top-0 end-0 m-3 rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: 42,
                    height: 42,
                    zIndex: 11,
                  }}
                  onClick={() => handleDelete(image?.public_id)}
                >
                  <Trash size={18} />
                </Button>
              </div>
            </div>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}
