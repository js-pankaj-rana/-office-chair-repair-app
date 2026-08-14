import React from "react";
import { IAddressForm } from "@/backend/models/orderdetails";
import BillingAddress from "./BillingAddress";

interface Props {
  billingAddress: IAddressForm;
  shippingAddress: IAddressForm;
  setSameAsShipping: (value: boolean) => void;
  sameAsShipping: boolean;
  handleBillingChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setIsBillingAddress: (value: boolean) => void;
}

export default function EditBillingAddress({
  billingAddress,
  shippingAddress,
  setSameAsShipping,
  sameAsShipping,
  handleBillingChange,
  setIsBillingAddress,
}: Props) {
  return (
    <>
      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          checked={sameAsShipping}
          onChange={(e) => setSameAsShipping(e.target.checked)}
        />

        <label className="form-check-label">
          Billing address same as shipping address
        </label>
      </div>

      {billingAddress.addressLine1 && (
        <BillingAddress
          data={billingAddress}
          onChange={handleBillingChange}
          sameAsShipping={sameAsShipping}
          setIsBillingAddress={setIsBillingAddress}
        />
      )}
    </>
  );
}
