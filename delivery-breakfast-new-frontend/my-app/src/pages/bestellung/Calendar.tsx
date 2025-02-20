import styled from "styled-components";
import { colors } from "../general/constants";
import React, { lazy, Suspense } from "react";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";

const DatePicker = lazy(() => import("react-datepicker"));
const LazyDatePicker = (
  props: JSX.IntrinsicAttributes &
    ReactDatePickerProps<string, boolean | undefined> &
    React.RefAttributes<ReactDatePicker<string, boolean | undefined>>
) => (
  <Suspense fallback={<div>Lädt...</div>}>
    <DatePicker {...props} />
  </Suspense>
);

export const StyledDatePicker = styled(LazyDatePicker)`
  font-family: "Oswald", sans-serif;
  font-size: 14px;
  color: ${colors.companycolor};
  background-color: ${colors.white};
  width: 200px;
  height: 25px;
  padding: 15px 0;
  text-align: center;
  border-radius: 5px;
  z-index: 1;
`;

export const Calendar = styled.div`
  box-shadow: 0 6px 12px rgba(27, 37, 86, 0.16);
  height: 280px;
  background-color: ${colors.white};
`;

export const Popper = styled.div`
  position: absolute;
  z-index: 2;
  color: ${colors.black};
  //Farbe der Zahlen im Kalender ändern
  .react-datepicker__day {
    color: ${colors.black};
    background-color: ${colors.white};
  }
  //Farbe des ausgewählten Tages ändern
  .react-datepicker__day--selected {
    background-color: ${colors.companycolor};
  }
  //Farbe des ausgewählten Tages ändern
  .react-datepicker__day--selected:hover {
    background-color: ${colors.companycolor};
  }
  //Farbe des ausgewählten Tages ändern
  .react-datepicker__day--selected:active {
    background-color: ${colors.black};
  }
  //Farbe des ausgewählten Tages ändern
  .react-datepicker__day--selected:focus {
    background-color: ${colors.companycolor};
  }
  //Farbe des ausgewählten Tages ändern
  .react-datepicker__day--selected:disabled {
    background-color: ${colors.companycolor};
  }
  //Farbe des ausgewählten Tages ändern
  .react-datepicker__day--selected:disabled:hover {
    background-color: ${colors.companycolor};
  }
  //Farbe des ausgewählten Tages ändern
  .react-datepicker__day--selected:disabled:active {
    background-color: ${colors.black};
  }
  //Farbe des ausgewählten Tages ändern
  .react-datepicker__day--selected:disabled:focus {
    background-color: ${colors.companycolor};
  }
  //Farbe des ausgewählten Tages ändern
  .react-datepicker__day--keyboard-selected {
    background-color: ${colors.companycolor};
  }
  //Farbe des ausgewählten Tages ändern
  .react-datepicker__day--keyboard-selected:hover {
    background-color: ${colors.companycolor};
  }
  //Farbe des ausgewählten Tages ändern
  .react-datepicker__day--keyboard-selected:active {
    background-color: ${colors.black};
  }
  //Farbe des ausgewählten Tages ändern
  .react-datepicker__day--keyboard-selected:focus {
    background-color: ${colors.companycolor};
  }
  //Farbe des ausgewählten Tages ändern
  .react-datepicker__day--keyboard-selected:disabled {
    background-color: ${colors.companycolor};
  }
  //Farbe des ausgewählten Tages ändern
`;
