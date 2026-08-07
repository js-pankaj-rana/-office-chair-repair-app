import { Badge, Button, Table } from "react-bootstrap";
import { useRouter } from "next/navigation";

interface Props {
  orders: IOrder[];
}

const OrderTable: React.FC<Props> = ({ orders }) => {
  const router = useRouter();

  const trimText = (text?: string, len = 40) => {
    if (!text) return "-";
    return text.length > len ? `${text.slice(0, len)}...` : text;
  };

  const getStatusVariant = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "success";
      case "cancelled":
        return "danger";
      case "pending":
        return "warning";
      case "processing":
        return "info";
      default:
        return "secondary";
    }
  };

  return (
    <div className="card shadow-sm border-0 rounded-4">
      <div className="card-header bg-white border-0 py-3">
        <h5 className="mb-0 fw-semibold">My Orders</h5>
      </div>

      <div className="table-responsive">
        <Table hover className="align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Fault Description</th>
              <th>Status</th>
              <th>Qty</th>
              <th>Schedule Date</th>
              <th>Shipping Address</th>
              <th>Images</th>
              <th width={130}>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => {
                const formattedDate = new Date(
                  order.scheduleDate
                ).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                });

                return (
                  <tr key={order._id}>
                    <td className="fw-semibold">{index + 1}</td>

                    <td style={{ minWidth: 220 }}>
                      {trimText(order.faultDescription)}
                    </td>

                    <td>
                      <Badge bg={getStatusVariant(order.orderStatus)}>
                        {order.orderStatus}
                      </Badge>
                    </td>

                    <td>{order.quantityOrdered}</td>

                    <td>{formattedDate}</td>

                    <td style={{ minWidth: 250 }}>
                      <div className="text-muted small">
                        {order.shippingAddress.addressLine1},
                        <br />
                        {order.shippingAddress.city} -{" "}
                        {order.shippingAddress.postalCode}
                      </div>
                    </td>

                    <td>
                      <Badge bg="secondary">{order.productImages.length}</Badge>
                    </td>

                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => router.push(`/order/${order._id}`)}
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-5 text-muted">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default OrderTable;
