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

export const LandingPageButton: React.FC<ButtonProps> = ({
  caption,
  onClick,
}) => {
  return (
    <Button
      style={{ color: "white" }}
      className="white-orange"
      onClick={onClick}
    >
      {caption}
    </Button>
  );
};

// export const but = styled.button`
//   display: inline-block;
//   width: 200px;
//   height: 50px;
//   padding: 15px 0;
//   text-align: center;
//   margin: 20px 10px;
//   border-radius: 25px;
//   font-weight: bold;
//   border: 2px solid #000;
//   color: #fff;
//   cursor: pointer;
//   position: relative;
//   overflow: hidden;
//   background-color: transparent;
//   z-index: 1;

//   &.white-orange {
//     border: 2px solid #aa7d03;
//     &:hover {
//       border: none;
//     }
//   }

//   &.black-color {
//     color: black;
//   }

//   &:before {
//     content: "";
//     display: block;
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 0%;
//     height: 100%;
//     background-color: black;
//     z-index: -1;
//     border-radius: 25px;
//     transition: all 0.5s;
//   }

//   &.white-orange:before {
//     background-color: #aa7d03;
//   }

//   &:hover {
//     border: none;
//   }

//   &:hover:before {
//     width: 100%;
//     transition: width 0.5s;
//   }

// `;
