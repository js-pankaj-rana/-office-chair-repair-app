import Invoice from "@/components/invoice/Invoice";
import InvoiceEmail from "@/components/invoice/InvoiceEmail";

export const metadata = {
  title: "Order Invoice Review",
};

export default async function InvoicePage() {
  return <Invoice />;
}
