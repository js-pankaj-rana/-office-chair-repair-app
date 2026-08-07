export default function BankDetails() {
  return (
    <table className="table-bordered-custom" width="100%">
      <tbody>
        <tr>
          <td className="px-2 fw-bold text-center" colSpan={2}>
            Bank Details
          </td>
        </tr>
        <tr>
          <td className="px-2">Account Name:</td>
          <td className="px-2">RAJESH ENTERPRISES</td>
        </tr>
        <tr>
          <td className="px-2">Account Number:</td>
          <td className="px-2">50200105807256</td>
        </tr>

        <tr>
          <td className="px-2">IFSC Code:</td>
          <td className="px-2">HDFC0000244</td>
        </tr>

        <tr>
          <td className="px-2">Bank </td>
          <td className="px-2">HDFC Bank </td>
        </tr>
        <tr>
          <td className="p-2 fw-bold text-center" colSpan={2}>
            Terms and Conditions
          </td>
        </tr>
        <tr>
          <td className="px-2" colSpan={2}>
            1. Subject to our home Jurisdiction.
          </td>
        </tr>
        <tr>
          <td className="px-2" colSpan={2}>
            2. Goods once sold will not taken back.
          </td>
        </tr>
      </tbody>
    </table>
  );
}
