import React, { useState } from "react";
import { SingleAddress } from "./SingleAddress";

export interface IAddressForm {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postalCode: string;
  state: string;
  isDefault?: boolean;
}

interface AddressCardProps {
  addresses: IAddressForm[];
}

interface IAddressCardProps {
  addressProps: {
    addresses: IAddressForm[];
    selectedIndex: number;
    setSelectedIndex: React.Dispatch<React.SetStateAction<IAddressForm | null>>;
  };
}

const AddressCard = ({ addressProps }: IAddressCardProps) => {
  const { addresses, selectedIndex, setSelectedIndex } = addressProps;

  const [showDropdown, setShowDropdown] = useState(false);
  let selectedAddress = {};
  if (addresses) {
    selectedAddress = addresses[selectedIndex] ?? null;
  }

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
              setSelectedIndex(Number(e.target.value));
              setShowDropdown(false);
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
