import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

export const StyledDatePicker = styled(DatePicker)`
  font-family: "Oswald", sans-serif;
  font-size: 14px;
  color: #c7c7c7;
  width: 200px;
  height: 25px;
  padding: 15px 0;
  text-align: center;
  border-radius: 5px;

  &__header {
    background-color: #ffffff;
    padding-top: 0px;
    border: none;
  }

  &__day-name {
    color: #c7c7c7;
    font-size: 14px;
  }

  &__day {
    color: #000000;
    font-size: 13px;

    &--keyboard-selected,
    &--selected {
      border-radius: 25px;
      background: #8b0000;
      color: #ffffff;
    }
    &--disabled {
      color: #c7c7c7;
    }
  }
`;
