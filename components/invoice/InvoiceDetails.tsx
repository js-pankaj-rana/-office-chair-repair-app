import { IInvoice } from "@/backend/models/invoices";
import {
  COMMON_HEADERS,
  INTRA_STATE_HEADERS,
  INTER_STATE_HEADERS,
  LAST_HEADER,
} from "@/constants/invoiceTable";

import { Table } from "react-bootstrap";
import InvoiceSummary from "./InvoiceSummary";

interface InvoiceDetailsProps {
  invoiceData: IInvoice;
}

export interface ISummary {
  taxableValue: number;
  cgst: number;
  sgst: number;
  igst: number;
  total: number;
}

export default function InvoiceDetails({ invoiceData }: InvoiceDetailsProps) {
  const isIntraState =
    // @ts-ignore
    invoiceData.orderDetail.billingAddress.state === "Jharkhand";
  const tableHeaders = [
    ...COMMON_HEADERS,
    ...(isIntraState ? INTRA_STATE_HEADERS : INTER_STATE_HEADERS),
    LAST_HEADER,
  ];

  const summary = invoiceData?.invoice?.reduce(
    (acc, item) => {
      const taxableValue = item.rate * item.unit;

      acc.taxableValue += taxableValue;
      acc.cgst += item.cgst;
      acc.sgst += item.sgst;
      acc.igst += item.igst;
      acc.total += item.totalPrice;

      return acc;
    },
    {
      taxableValue: 0,
      cgst: 0,
      sgst: 0,
      igst: 0,
      total: 0,
    }
  );

  const totalGst = isIntraState ? summary.cgst + summary.sgst : summary.igst;

  return (
    <div>
      <Table striped bordered hover className="table-bordered-custom">
        <thead className="small">
          <tr>
            {tableHeaders.map((item) => (
              <th key={item.label}>{item.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {invoiceData?.invoice?.map((item, index) => {
            return (
              // @ts-ignore
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.description}</td>
                <td>{item.HsnSacCode}</td>
                <td>{item.unit}</td>
                <td className="text-end">{item.rate.toFixed(2)}</td>
                <td>{(item.rate * item.unit).toFixed(2)}</td>
                {isIntraState ? (
                  <>
                    <td>{item.gstPercentage / 2}%</td>
                    <td className="text-end">{item.cgst.toFixed(2)}</td>
                    <td>{item.gstPercentage / 2}%</td>
                    <td className="text-end">{item.sgst.toFixed(2)}</td>
                  </>
                ) : (
                  <>
                    <td>{item.gstPercentage}%</td>
                    <td className="text-end">{item.igst.toFixed(2)}</td>
                  </>
                )}

                <td className="text-end">{item.totalPrice.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          {/* GST Total */}
          <tr>
            <td colSpan={isIntraState ? 8 : 6} className="text-end fw-bold">
              Total GST
            </td>

            {isIntraState ? (
              <>
                <td className="text-end fw-bold">
                  ₹ {summary.cgst.toFixed(2)}
                </td>
                <td></td>
                <td className="text-end fw-bold">
                  ₹ {summary.sgst.toFixed(2)}
                </td>
              </>
            ) : (
              <>
                <td className="text-end fw-bold">
                  ₹ {summary.igst.toFixed(2)}
                </td>
              </>
            )}

            <td className="text-end fw-bold">₹ {totalGst.toFixed(2)}</td>
          </tr>

          {/* Grand Total */}
          <tr>
            <td colSpan={isIntraState ? 10 : 8} className="text-end fw-bold">
              Grand Total
            </td>

            <td className="text-end fw-bold">₹ {summary.total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </Table>
      <br />
      <br />
      <InvoiceSummary summary={summary} isIntraState={isIntraState} />
    </div>
  );
}
