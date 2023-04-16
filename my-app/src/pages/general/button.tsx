import React from "react";
import { Button } from "./button.styles";

interface ButtonProps {
  caption: string;
}

export const BlackButton: React.FC<ButtonProps> = ({ caption }) => {
  return <Button>{caption}</Button>;
};

export const OrangeButton: React.FC<ButtonProps> = ({ caption }) => {
  return <Button className="white-orange">{caption}</Button>;
};

export const BlackColorButton: React.FC<ButtonProps> = ({ caption }) => {
  return <Button className="black-color white-orange">{caption}</Button>;
};
