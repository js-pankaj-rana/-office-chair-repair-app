import { IAddressForm } from "@/backend/models/orderdetails";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface CustomerDetailsProps {
  shippingAddress: IAddressForm;
  billingAddress: IAddressForm;
  orderNumber: string;
  gstin: string;
}

export default function CustomerDetails({
  // customerName,
  // customerEmail,
  // customerPhone,
  shippingAddress,
  billingAddress,
  orderNumber,
}: CustomerDetailsProps) {
  const {
    addressLine1,
    addressLine2,
    city,
    postalCode,
    state,
    billingName = null,
    gstin = null,
  } = shippingAddress || {};
  const {
    addressLine1: billingAddressLine1,
    addressLine2: billingAddressLine2,
    city: billingCity,
    postalCode: billingPostalCode,
    state: billingState,
    gstin: billingGstin,
    billingName: firmBillingName,
  } = billingAddress || {};

  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <div className="row">
      <div className="container">
        <div className="col-12 position-relative mt-2">
          <table className="table-bordered-custom w-100">
            <tbody>
              <tr>
                <td className="text-center fw-bold p-2">
                  Quotation / Estimate
                  <span className="text-end fw-normal position-absolute order-number">
                    Quotation Number: &nbsp;
                    <strong>{orderNumber}</strong>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-8 p-3">
          <div className="customer-details">
            <table>
              <tbody>
                <tr>
                  <td colSpan={2} className="fw-bold">
                    Customer Details:
                  </td>
                </tr>
                {billingGstin && (
                  <tr>
                    <td className="fw-bold">Customer GSTIN: </td>
                    <td>{billingGstin}</td>
                  </tr>
                )}
                <tr>
                  <td className="fw-bold">Customer Name: </td>
                  <td>{billingName ? billingName : user.name}</td>
                </tr>
                <tr>
                  <td className="fw-bold">Customer Email: </td>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <td className="fw-bold">Customer Phone: </td>
                  <td>{user.phone}</td>
                </tr>
                <tr>
                  <td className="fw-bold">Servicing Address: </td>
                  <td>
                    {addressLine1}, {addressLine2}, {city}, {state},{" "}
                    {postalCode}
                  </td>
                </tr>
                <tr>
                  <td className="fw-bold">Billing Address: </td>
                  <td>
                    {firmBillingName} {billingAddressLine1}{" "}
                    {billingAddressLine2}, {billingCity}, {billingState},{" "}
                    {billingPostalCode}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
