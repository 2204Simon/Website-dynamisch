import React, { ChangeEvent, useState } from "react";
import { CustomToast } from "../general/toast.style";
import { QuantityInput } from "./styles/NewspaperBanner.styles";

interface PickDayProps {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

const PickDay: React.FC<PickDayProps> = ({ quantity, setQuantity }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/^0+/, "");
    const parsedValue = Number(value);

    if (isNaN(parsedValue)) {
      setQuantity(0);
      CustomToast.error("Ungültige Eingabe");
    } else {
      if (parsedValue > 24) {
        setQuantity(24);
      } else {
        setQuantity(parsedValue);
      }
    }
  };

  return (
    <QuantityInput
      type="text"
      id="inputField"
      value={quantity}
      onChange={handleChange}
    />
  );
};

export default PickDay;
