import { IAddressForm } from "@/backend/models/user";
import { Table } from "react-bootstrap";

interface CustomerDetailsProps {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: IAddressForm;
  billingAddress: IAddressForm;
  orderNumber: string;
  gstin: string;
}

export default function CustomerDetails({
  customerName,
  customerEmail,
  customerPhone,
  shippingAddress,
  billingAddress,
  orderNumber,
  gstin,
}: CustomerDetailsProps) {
  const { addressLine1, addressLine2, city, postalCode, state } =
    shippingAddress || {};
  const {
    addressLine1: billingAddressLine1,
    addressLine2: billingAddressLine2,
    city: billingCity,
    postalCode: billingPostalCode,
    state: billingState,
  } = billingAddress || {};

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
                {gstin && (
                  <tr>
                    <td className="fw-bold">Customer GSTIN: </td>
                    <td>{gstin}</td>
                  </tr>
                )}
                <tr>
                  <td className="fw-bold">Customer Name: </td>
                  <td>{customerName}</td>
                </tr>
                <tr>
                  <td className="fw-bold">Customer Email: </td>
                  <td>{customerEmail}</td>
                </tr>
                <tr>
                  <td className="fw-bold">Customer Phone: </td>
                  <td>{customerPhone}</td>
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
                    {billingAddressLine1}, {billingAddressLine2}, {billingCity},{" "}
                    {billingState}, {billingPostalCode}
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
