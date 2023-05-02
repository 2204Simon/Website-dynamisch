import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { colors } from "../../general/constants";

export const StyledDatePicker = styled(DatePicker)`
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
