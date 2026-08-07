import { Badge, Button, Card, ListGroup } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { IOrder } from "./OrdersDetail";

interface Props {
  order: IOrder;
}

const OrderCard: React.FC<Props> = ({ order }) => {
  const router = useRouter();

  const trimText = (text: string, len = 50) => {
    if (!text) {
      console.log("buggy code");
    }
    return text.length > len ? `${text.slice(0, len)}...` : text;
  };
  // text.length > len ? `${text.slice(0, len)}...` : text;

  const formattedDate = new Date(order.scheduleDate).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

  return (
    <Card className="shadow-sm mb-3 border-0 p-4">
      <Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item className="px-0">
            <strong>Fault Description</strong>
            <div className="text-muted">
              {trimText(order.faultDescription, 40)}
            </div>
          </ListGroup.Item>

          <ListGroup.Item className="px-0 d-flex justify-content-between">
            <span>Status</span>

            <Badge bg="warning" text="dark">
              {order.orderStatus}
            </Badge>
          </ListGroup.Item>

          <ListGroup.Item className="px-0 d-flex justify-content-between">
            <span>Quantity</span>
            <span>{order.quantityOrdered}</span>
          </ListGroup.Item>

          <ListGroup.Item className="px-0 d-flex justify-content-between">
            <span>Schedule Date</span>
            <span>{formattedDate}</span>
          </ListGroup.Item>

          <ListGroup.Item className="px-0">
            <strong>Shipping Address</strong>

            <div className="text-muted">
              {order.shippingAddress.addressLine1}, {order.shippingAddress.city}{" "}
              - {order.shippingAddress.postalCode}
            </div>
          </ListGroup.Item>

          <ListGroup.Item className="px-0 d-flex justify-content-between">
            <span>Images</span>

            <Badge bg="secondary">{order.productImages.length}</Badge>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>

      <Card.Footer className="bg-white border-0 d-flex justify-content-end">
        <Button
          variant="primary"
          size="sm"
          onClick={() => router.push(`/order/${order._id}`)}
        >
          View Details
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default OrderCard;
