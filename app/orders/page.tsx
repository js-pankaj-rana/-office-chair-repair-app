import OrderDetails from "@/components/order/OrderList";

export const metadata = {
  title: "View all orders",
};

export default async function OrdersPage() {
  return (
    <>
      <OrderDetails />
    </>
  );
}
