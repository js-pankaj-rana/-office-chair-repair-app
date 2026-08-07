import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  /* config options here */
  images: {
    remotePatterns: [
      new URL("http://res.cloudinary.com/dvxux8mm0/image/**/*.*"),
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  env: {
    APP_NAME: "ZHELPS ChairCare",
    API_URL: "http://localhost:3000",
    NEXTAUTH_URL: "http://localhost:3000",
    NEXTAUTH_SECRET: "RADHA1RANI2MATA4VAISNOVI5DHN6GRD",
    DB_LOCAL_URI: "mongodb://127.0.0.1:27017/online-repair-service",
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "dvxux8mm0",
    NEXT_PUBLIC_CLOUDINARY_API_KEY: "448299222249243",
    CLOUDINARY_API_SECRET: "lTSGx8po1DlPZaFkyygkIadlFnE",
    NEXT_PUBLIC_CLOUDINARY_SECURE_DISTRIBUTION: "zhelp.in",
    NEXT_PUBLIC_CLOUDINARY_PRIVATE_CDN: "false",
    DATABASE_URL:
      "postgresql://postgre:Exp@nd#551@localhost:5432/mydb?schema=classicmodels",
    APP_SME_CLIENT_ID: "23f48b7d712FD29F",
    APP_SME_CLIENT_SECREAT:
      "9d81743453137b8ad3cfc7baf8a4e719082eeccff4717f5407fd05730ebdd0e3",
    SMTP_HOST: "smtpout.secureserver.net",
    SMTP_PORT: "465",
    SMTP_USER: "noreply@zhelps.in",
    SMTP_PASSWORD: "Sh!v$h@mbu",
    SMTP_FROM_NAME: "ZHELP Repair Services",
    SMTP_FROM_EMAIL: "noreply@zhelps.in",
    SUPPORT_EMAIL: "admin@zhelps.in",

    //we will use this on production env
    SMEPAY_CLIENT_ID: "23f48b7d712FD29F",
    SMEPAY_CLIENT_SECRET:
      "9d81743453137b8ad3cfc7baf8a4e719082eeccff4717f5407fd05730ebdd0e3",
  },
};

export default nextConfig;
