// Zeitung.tsx

import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  KonfiguratorContainer,
  ProcessButton,
} from "./styles/Konfigurator.styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Topping from "./Topping";
import Drink from "./Drink";
import Other from "./Other";
import Biscuit from "./Biscuit";

const Konfigurator = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [index, setIndex] = useState<number>(0);
  const [continueVisible, setContinueVisible] = useState<boolean>(true);
  const [backVisible, setBackVisible] = useState<boolean>(false);
  let content;

  const Continue = () => {
    setIndex(index => (index < 3 && index >= 0 ? index + 1 : 0));
  };

  const Back = () => {
    setIndex(index => (index <= 3 && index > 0 ? index - 1 : 0));
  };

  useEffect(() => {
    if (index === 3) {
      setContinueVisible(false);
    } else {
      setContinueVisible(true);
    }

    if (index === 0) {
      setBackVisible(false);
    } else {
      setBackVisible(true);
    }

    console.log(index);
  }, [index]);

  switch (index) {
    case 1:
      content = <Topping />;
      break;
    case 2:
      content = <Drink />;
      break;
    case 3:
      content = <Other />;
      break;
    default:
      content = <Biscuit />;
  }

  return (
    <KonfiguratorContainer>
      {continueVisible && (
        <ProcessButton onClick={Continue}>Weiter</ProcessButton>
      )}
      {backVisible && <ProcessButton onClick={Back}>Zurück</ProcessButton>}
      {content}
    </KonfiguratorContainer>
  );
};

export default Konfigurator;
