"use client";

import Image from "next/image";
import "./loader.css";

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="loader">
        <Image
          src="/images/sign-no-tagline-transparent-50x50.svg"
          alt="Loading"
          width={50}
          height={50}
          priority
        />
      </div>
    </div>
  );
};

export default Loader;
