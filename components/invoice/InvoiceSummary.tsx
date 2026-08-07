import { toWords } from "@/helpers/utils";
import BankDetails from "./BankDetails";
import { ISummary } from "./InvoiceDetails";

interface Props {
  summary: ISummary;
  isIntraState: boolean;
}

export default function InvoiceSummary({ summary, isIntraState }: Props) {
  return (
    <>
      <table className="table-bordered-custom w-100 mb-5">
        <tbody>
          <tr>
            <td className="border-bottom p-2 fw-bold">Total in words</td>
            <td className="p-2">{toWords.convert(summary.total)}</td>
          </tr>
        </tbody>
      </table>

      <div className="row">
        <div className="col-8">
          <BankDetails />
        </div>

        <div className="col-4">
          <table className="table table-bordered-custom mb-0">
            <tbody>
              <tr>
                <th>Taxable Amount</th>
                <td className="text-end">{summary.taxableValue.toFixed(2)}</td>
              </tr>

              {!isIntraState ? (
                <tr>
                  <th>IGST</th>
                  <td className="text-end">{summary.igst.toFixed(2)}</td>
                </tr>
              ) : (
                <>
                  <tr>
                    <th>CGST</th>
                    <td className="text-end">{summary.cgst.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <th>SGST</th>
                    <td className="text-end">{summary.sgst.toFixed(2)}</td>
                  </tr>
                </>
              )}

              <tr>
                <th>Total Tax</th>
                <td className="text-end">
                  {isIntraState
                    ? (summary.cgst + summary.sgst).toFixed(2)
                    : summary.igst.toFixed(2)}
                </td>
              </tr>

              <tr className="fw-bold fs-5">
                <th>Total Amount</th>
                <td className="text-end">₹ {summary.total}</td>
              </tr>
            </tbody>
          </table>

          <div className="border p-3 text-center mt-2">
            This is computer generated invoice.
            <br />
            No signature required.
          </div>
        </div>
      </div>
    </>
  );
}
