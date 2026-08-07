import React from "react";
import {
  IconBooking,
  IconReview,
  IconTechnician,
  IconComplete,
} from "../icons";
import { Card, CardBody, CardTitle } from "react-bootstrap";
const steps = [
  {
    title: "Booking",
    description:
      "Book your office chair repair online in less than two minutes.",
  },
  {
    title: "Review the Spare Part",
    description:
      "Our experts review the uploaded images and identify the required spare parts.",
  },
  {
    title: "Technician Visit",
    description:
      "A trained technician visits your location with the required spare parts.",
  },
  {
    title: "Complete",
    description:
      "Repair completed and your chair is ready for use with warranty.",
  },
];

const BookingTimeline = () => {
  function renderStepperIcon(index: number) {
    switch (index) {
      case 0:
        return <IconBooking />;
      case 1:
        return <IconReview />;
      case 2:
        return <IconTechnician />;
      case 3:
        return <IconComplete />;
    }
  }

  return (
    <section className="pt-5 bg-light">
      <div className="text-center mb-2">
        <h2 className="fw-bold">How It Works</h2>
      </div>

      <div className="container py-5">
        <div className="row g-4">
          {steps.map((step, index) => (
            <div className="col-12 col-md-3 position-relative" key={index}>
              <Card className="step-card border-0 shadow-sm h-100">
                <CardTitle className="text-white bg-brand py-3 text-center mb-0">
                  {step.title}
                </CardTitle>
                <CardBody className="step-card-body">
                  {/* Front Side */}
                  <div className="step-front">
                    <div className="fw-lighter fs-1">{index + 1}</div>
                    <div className="step-icon mb-3">
                      {renderStepperIcon(index)}
                    </div>
                  </div>

                  {/* Hover Content */}
                  <div className="step-back bg-brand text-white">
                    <p>{step.description}</p>
                  </div>
                </CardBody>
              </Card>

              {index !== steps.length - 1 && (
                <div className="step-line d-none d-md-block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookingTimeline;
