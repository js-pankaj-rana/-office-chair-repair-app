"use client";

import React, { useState } from "react";

import { useAppSelector } from "@/redux/hooks";
import NavigateAddressModal from "./modals/NavigateAddressModal";
import { useRouter } from "next/navigation";

import { OFFICE_CHAIR_REPAIR_CONTENT, RepairSection } from "@/constants/home";
import HomeCard from "./home/Card";
import HeroShot from "./home/HeroShot";
import WhyChooseUs from "./home/WhyChooseUs";
import BookingTimeline from "./home/BookingTimeline";
import Testimonials from "./home/Testimonials";

const Home: React.FC = () => {
  const [hasCtaPress, setHasCtaPress] = useState(false);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const { user } = useAppSelector((state) => state.auth);

  const handleBooking = async () => {
    if (hasCtaPress) return;
    const userInfo = await user;
    if (!userInfo) {
      router.push("/login");
      return;
    }
    const { address } = userInfo;
    if (address.length > 0) {
      router.push("/order");
    } else {
      setShowModal(true);
    }
    setHasCtaPress(true);
  };

  return (
    <>
      <NavigateAddressModal
        show={showModal}
        onClose={() => setShowModal(false)}
      />

      {/* Hero Section */}
      <HeroShot handleBooking={handleBooking} hasCtaPress={hasCtaPress} />
      {/* Services */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="mb-5">
            <h2 className="fw-bold gray-900 mb-5 text-center">
              Premium Office Chair Repair Services
            </h2>

            <div className="row justify-content-center">
              {OFFICE_CHAIR_REPAIR_CONTENT.map((card: RepairSection, index) => (
                <HomeCard key={index} item={card} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Process */}
      {/* <TimeLine /> */}
      <BookingTimeline currentStep={4} />
      {/* CTA */}
      <Testimonials />
    </>
  );
};

export default Home;
