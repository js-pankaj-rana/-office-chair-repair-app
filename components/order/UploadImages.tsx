"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

const MAX_IMAGES = 5;

interface IProps {
  imgProps: {
    images: string[];
    setImages: (arg: string) => void;
    uploadedImages: File[];
    setUploadedImages: (arg: File) => void;
  };
}

const UploadImages = ({ imgProps }: IProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { images, setImages } = imgProps;
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    // Existing images + newly selected images cannot exceed MAX_IMAGES
    const remaining = MAX_IMAGES - images.length;

    if (remaining <= 0) {
      alert(`You can upload only ${MAX_IMAGES} images.`);
      e.target.value = "";
      return;
    }

    // Only keep the allowed number of files
    const selectedFiles = files.slice(0, remaining);

    selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((oldArray) => [...oldArray, reader.result as string]);
          setImagesPreview((oldArray) => [
            ...oldArray,
            reader.result as string,
          ]);
        }
      };

      reader.readAsDataURL(file);
    });

    e.target.value = "";
  };

  const removeImagePreview = (imgUrl: string) => {
    const filteredImagesPreview = imagesPreview.filter((img) => img != imgUrl);

    setImagesPreview(filteredImagesPreview);
    setImages(filteredImagesPreview);
  };

  return (
    <>
      <div className="d-flex flex-wrap gap-1">
        {imagesPreview.map((image, index) => (
          <div
            key={index}
            className="position-relative border rounded overflow-hidden"
            style={{
              width: 200,
              height: 200,
            }}
          >
            <Image
              src={image}
              alt="Preview"
              width={200}
              height={200}
              unoptimized
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
            />

            <button
              type="button"
              className="btn btn-danger btn-sm position-absolute top-0 end-0 rounded-circle m-2"
              onClick={() => removeImagePreview(index)}
            >
              ×
            </button>
          </div>
        ))}

        {images.length < MAX_IMAGES && (
          <div
            className="border border-2 rounded d-flex align-items-center justify-content-center"
            style={{
              width: 200,
              height: 200,
              cursor: "pointer",
              borderStyle: "dashed",
            }}
            onClick={() => inputRef.current?.click()}
          >
            <span
              style={{
                fontSize: 60,
                color: "#6c757d",
                userSelect: "none",
              }}
            >
              +
            </span>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />

      <small className="text-muted d-block mt-2">
        {images.length}/{MAX_IMAGES} images uploaded
      </small>
    </>
  );
};

export default UploadImages;
