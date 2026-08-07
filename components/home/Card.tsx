import { Card, CardBody } from "react-bootstrap";
import { RepairSection } from "@/constants/home";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface IProps {
  item: RepairSection;
}

export default function HomeCard({ item }: IProps) {
  const { title, description, listAttr } = item;
  const router = useRouter();
  return (
    <div className="col-md-3 mt-2">
      <Card
        className="p-4 border rounded-4 service-card h-100"
        onClick={() => router.push("/order")}
      >
        <h4 className="mt-3">{title}</h4>

        <CardBody className="d-flex flex-column flex-grow-1">
          <p className="flex-grow-1">
            {description.substring(0, 130) + "...."}
          </p>
          {listAttr && (
            <ul className="list-unstyled pl-2">
              {listAttr.map((list: string, index) => (
                <li
                  key={index}
                  className="d-flex align-items-start align-items-center mb-2"
                >
                  <Image
                    src="lineRightArrow.svg"
                    alt="svg-icon"
                    width="32"
                    height="32"
                  />
                  <span>{list}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-auto text-end pt-2">
            <span className="link">Explore</span>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
