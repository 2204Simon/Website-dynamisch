import styled from "styled-components";
import { colors } from "./constants";
export const Button = styled.button`
  display: inline-block;
  width: 200px;
  height: 50px;
  padding: 15px 0;
  text-align: center;
  margin: 20px 10px;
  border-radius: 25px;
  font-weight: bold;
  border: 2px solid ${colors.white};
  color: ${colors.white};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background-color: transparent;
  z-index: 1;

  &.white-orange {
    border: 2px solid ${colors.companycolor};
    &:hover {
      border: none;
    }
  }

  &.black-color {
    color: ${colors.black};
  }

  &:before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background-color: ${colors.black};
    z-index: -1;
    border-radius: 25px;
    transition: all 0.5s;
  }

  &.white-orange:before {
    background-color: ${colors.companycolor};
  }

  &:hover {
    border: none;
  }

  &:hover:before {
    width: 100%;
    transition: width 0.5s;
  }
`;
