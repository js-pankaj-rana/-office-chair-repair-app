import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="py-2 bg-brand text-white font-md">
      <div className="container">
        <div className="row gap-2 align-items-center justify-content-between">
          <div className="col-lg-2">
            <Image
              src="/images/w-logo.png"
              width={152}
              height={40}
              alt="logo image"
            />
          </div>
          <div className="col-lg-4">
            &copy; www.zhelps.in - 2024 to {new Date().getFullYear()}, All
            rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
