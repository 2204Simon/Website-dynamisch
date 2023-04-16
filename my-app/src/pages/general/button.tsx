import React from "react";
import { Button } from "./button.styles";

interface ButtonProps {
  caption: string;
  onClick?: () => void;
}

export const BlackButton: React.FC<ButtonProps> = ({ caption, onClick }) => {
  return <Button onClick={onClick}>{caption}</Button>;
};

export const OrangeButton: React.FC<ButtonProps> = ({ caption, onClick }) => {
  return (
    <Button className="white-orange" onClick={onClick}>
      {caption}
    </Button>
  );
};

export const BlackColorButton: React.FC<ButtonProps> = ({
  caption,
  onClick,
}) => {
  return (
    <Button className="black-color white-orange" onClick={onClick}>
      {caption}
    </Button>
  );
};
