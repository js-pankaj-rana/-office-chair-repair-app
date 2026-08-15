import "bootstrap/dist/css/bootstrap.css";
import { Roboto } from "next/font/google";

import "./globals.css";
import "./customerReview.css";
import "./bookingTimeline.css";

import type { Metadata } from "next";
import Head from "./head";
import Script from "next/script";
import { GlobalProvider } from "./GlobalProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/next";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Office Chair Repair Services | Expert Chair Repair & Spare Parts",
  description:
    "Professional office chair repair services including gas lift replacement, wheel repair, base replacement, armrest repair, hydraulic cylinder replacement, and genuine spare parts. Book a technician for fast and reliable chair repair.",
  keywords: [
    "office chair repair",
    "chair repair services",
    "office chair service",
    "chair maintenance",
    "gas lift replacement",
    "office chair wheels replacement",
    "chair hydraulic repair",
    "office chair spare parts",
    "chair technician",
    "ergonomic chair repair",
    "office chair base replacement",
    "chair armrest repair",
    "Zhelps chair armrest repair",
    "Zhelps services",
    "Home appliences repair services",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // alternates: {
  //   canonical: "https://yourdomain.com/chair-services",
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.className}>
      <Head />
      <body>
        <GlobalProvider>
          <Header />
          {children}
          <Footer />
          <Analytics />
        </GlobalProvider>

        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></Script>
        <Script src="https://kit.fontawesome.com/9edb65c86a.js"></Script>
      </body>
    </html>
  );
}
