import React from "react";
import { IFieldConfig } from "@/constants/formConstant";

interface InputFieldProps {
  field: IFieldConfig;
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ field, value, onChange }) => {
  return (
    <>
      <input
        type={field.type}
        name={field.name}
        placeholder={field.placeholder ?? ""}
        className={`form-control my-2 ${field.className ?? ""}`}
        value={value}
        onChange={onChange}
        readOnly={field.readOnly}
        {...("min" in field ? { min: field.min } : null)}
      />
    </>
  );
};

export default React.memo(InputField);
