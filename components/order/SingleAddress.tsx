import { IAddressForm } from "./AddressCard";

type billingAddress = IAddressForm & {
  gstin?: string;
  billingName?: string;
};
interface IProps {
  address: billingAddress;
}

export const SingleAddress = ({ address }: IProps) => {
  const { addressLine1, addressLine2, city, state, postalCode } = address;

  return (
    <div className="border p-3 rounded-3 card h-100">
      {address?.gstin ? (
        <p className="mb-1 fw-medium">GSTIN: {address?.gstin}</p>
      ) : (
        ""
      )}
      {address?.billingName ? (
        <p className="mb-1 fw-medium">Billing Name: {address?.billingName}</p>
      ) : (
        ""
      )}

      <p className="mb-1 fw-medium">{addressLine1}</p>
      {addressLine2 && <p className="mb-1">{addressLine2}</p>}
      <p className="mb-1">
        {city}, {state}
      </p>
      <p className="mb-0">
        <strong>PIN:</strong> {postalCode}
      </p>
    </div>
  );
};
