import { getAuthHeader } from "@/helpers/authHeader";
import OrderDetail from "@/components/order/OrderDetail";

export const metadata = {
  title: "My Service Booking Details",
};

const getOrder = async (id: string) => {
  const authHeader = await getAuthHeader();

  const res = await fetch(`${process.env.API_URL}/api/order/${id}`, authHeader);
  return res.json();
};

export default async function GetOrderById({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return <OrderDetail id={id} />;
}
