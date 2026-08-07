import UpdateOrder from "@/components/order/UpdateOrder";

export const metadata = {
  title: "Create Order",
};

export default async function UpdateOrderPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return <UpdateOrder id={id} />;
}
