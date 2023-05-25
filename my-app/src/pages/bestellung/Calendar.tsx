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
`;

export const Popper = styled.div`
  position: absolute;
  z-index: 2;
`;
