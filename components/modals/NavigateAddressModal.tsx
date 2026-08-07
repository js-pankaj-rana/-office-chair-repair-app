"use client";

import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useRouter } from "next/navigation";

interface Props {
  show: boolean;
  onClose: () => void;
}

const COUNTDOWN = 10;

const NavigateAddressModal: React.FC<Props> = ({ show, onClose }) => {
  const router = useRouter();
  const [seconds, setSeconds] = useState(COUNTDOWN);

  useEffect(() => {
    if (!show) return;

    setSeconds(COUNTDOWN);

    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onClose();
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [show, onClose]);

  const handleNavigate = () => {
    onClose();
    router.push("/me/address/add");
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="text-warning fw-bold">
          📍 Address Required
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-center py-4">
        <div
          className="rounded-circle bg-warning bg-opacity-10 d-inline-flex align-items-center justify-content-center mb-3"
          style={{ width: 80, height: 80 }}
        >
          <span style={{ fontSize: 38 }}>🏠</span>
        </div>

        <h5 className="fw-semibold mb-3">Before booking your order</h5>

        <p className="text-muted">
          Please add at least <strong>one delivery address</strong> before
          proceeding with your new order booking.
        </p>

        <div className="alert alert-warning mt-4 mb-0">
          This dialog will close automatically in <strong>{seconds}s</strong>
        </div>
      </Modal.Body>

      <Modal.Footer className="border-0 justify-content-center">
        <Button variant="outline-secondary" onClick={onClose}>
          Cancel
        </Button>

        <Button variant="primary" onClick={handleNavigate}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NavigateAddressModal;
