// Zeitung.tsx

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { KonfiguratorContainer } from "./styles/Konfigurator.styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Konfigurator = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return <KonfiguratorContainer></KonfiguratorContainer>;
};

export default Konfigurator;
