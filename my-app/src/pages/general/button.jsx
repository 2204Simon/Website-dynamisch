import { Button } from "./button.styles";

export const BlackButton = ({ caption }) => {
  return <Button>{caption}</Button>;
};

export const OrangeButton = ({ caption }) => {
  return <Button className="white-orange">{caption}</Button>;
};

export const BlackColorButton = ({ caption }) => {
  return <Button className="black-color white-orange">{caption}</Button>;
};
