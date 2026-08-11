import React, { useEffect, useState } from "react";
import { SingleAddress } from "./SingleAddress";
import { IAddressForm } from "@/backend/models/orderdetails";

interface IAddressCardProps {
  addressProps: {
    addresses: IAddressForm[];
    selectedIndex: number;
    setSelectedIndex: (num: number) => void;
  };
}

const AddressCard = ({ addressProps }: IAddressCardProps) => {
  const { addresses, selectedIndex, setSelectedIndex } = addressProps;

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<null | IAddressForm>();
  useEffect(() => {
    if (selectedIndex) {
      setSelectedAddress(addresses[selectedIndex]);
    }
  }, [selectedIndex]);

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h6 className="mb-0">{"Shipping Address"}</h6>

          {addresses?.length > 1 && !showDropdown && (
            <button
              className="btn btn-link p-0 text-decoration-none"
              onClick={() => setShowDropdown(true)}
            >
              Change
            </button>
          )}
        </div>

        {showDropdown ? (
          <select
            className="form-select mb-3"
            value={selectedIndex}
            onChange={(e) => {
              const { value } = e.target;
              if (typeof value === "string") {
                setSelectedIndex(Number(value));
                setShowDropdown(false);
              }
            }}
          >
            {addresses.map((address, index) => (
              <option key={index} value={index}>
                {`${address.addressLine1}, ${address.city}, ${address.state}`}
              </option>
            ))}
          </select>
        ) : (
          <SingleAddress address={selectedAddress ?? addresses[0]} />
        )}
      </div>
    </div>
  );
};

export default AddressCard;
