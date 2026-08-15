"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();

  const amount = searchParams.get("amount");
  const refId = searchParams.get("ref_id");

  return (
    <div className="container py-5">
      <div
        className="row justify-content-center align-items-center"
        style={{ minHeight: "70vh" }}
      >
        <div className="col-md-7 col-lg-6">
          <div className="card border-0 shadow-sm text-center rounded-4">
            <div className="card-body p-5">
              {/* Success Icon */}
              <div
                className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-circle bg-success-subtle"
                style={{
                  width: "80px",
                  height: "80px",
                }}
              >
                <span
                  className="text-success fw-bold"
                  style={{ fontSize: "42px" }}
                >
                  ✓
                </span>
              </div>

              {/* Heading */}
              <h2 className="fw-bold mb-2 text-brand">Payment Successful!</h2>

              <p className="text-muted mb-4">
                Thank you for your payment. Your service request has been
                confirmed successfully.
              </p>

              {/* Payment Details */}
              <div className="bg-light rounded-3 p-4 mb-4 text-start">
                {amount && (
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Amount Paid</span>
                    <strong>₹{amount}</strong>
                  </div>
                )}

                {refId && (
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Payment Reference</span>
                    <strong className="text-break ms-3">{refId}</strong>
                  </div>
                )}
              </div>

              {/* Next Step */}
              <div className="alert alert-success text-start">
                <strong>What happens next?</strong>
                <p className="mb-0 mt-1">
                  Our technician will review your service request and contact
                  you shortly to schedule the service visit.
                </p>
              </div>

              {/* Actions */}
              <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center mt-4">
                <Link
                  href="/me/orders"
                  className="btn btn-brand text-white px-4"
                >
                  View My Booking
                </Link>

                <Link href="/" className="btn btn-outline-secondary px-4">
                  Go to Home
                </Link>
              </div>

              <p className="text-muted small mt-4 mb-0">
                Please keep your payment reference ID for future communication.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
