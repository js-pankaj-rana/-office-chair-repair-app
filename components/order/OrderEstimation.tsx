import { IEstimatePrice } from "@/backend/models/orderdetails";
import React from "react";
import { Button } from "react-bootstrap";
import { ORDER_ESTIMATION_FIELDS } from "@/constants/formConstant";
import InputField from "../form/InputField";
import { checkIgstOrSgst, handleFieldClassName } from "@/helpers/utils";

interface IProps {
  estimatePrice: IEstimatePrice;
  isLoading: boolean;
  formId: number;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number | string
  ) => void;
  generateInvoice: () => void;
  removeEstimation: (id: string | number) => void;
  orderStatus: "Start" | "Initiated" | "Verified" | "Cancelled" | "Successful";
  businessState: string;
  billingState: string;
}

export function OrderEstimation({
  estimatePrice,
  formId,
  isLoading,
  handleChange,
  generateInvoice,
  removeEstimation,
  billingState,
  businessState,
}: IProps) {
  const onInputFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e, formId);
  };

  const FILTER_ORDER_ESTIMATION_FIELDS = checkIgstOrSgst(
    ORDER_ESTIMATION_FIELDS,
    businessState,
    billingState
  );

  return (
    <>
      {FILTER_ORDER_ESTIMATION_FIELDS.map((field) => (
        <div className={`${handleFieldClassName(field.name)}`} key={field.name}>
          <InputField
            field={field}
            value={estimatePrice[field.name]}
            onChange={onInputFieldChange}
          />
        </div>
      ))}
      <div className="col-lg-2">
        <Button
          className="btn btn-danger mt-2"
          disabled={estimatePrice.totalPrice <= 0}
          onClick={() => removeEstimation(formId)}
        >
          Delete
        </Button>
      </div>
    </>
  );
}
