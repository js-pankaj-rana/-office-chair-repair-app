import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadFile = (
  file: string,
  folder: string
): Promise<{ public_id: string; url: string }> => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      file,
      {
        resource_type: "image",
        folder: folder,
      },
      (error, result: any) => {
        resolve({
          public_id: result.public_id,
          url: result.url,
        });
      }
    );
  });
};

const deleteFile = async (file: string): Promise<boolean> => {
  const res = await cloudinary.v2.uploader.destroy(file);

  if (res?.result === "ok") return true;
  return false;
};

export { uploadFile, deleteFile, cloudinary };
