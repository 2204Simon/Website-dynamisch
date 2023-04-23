import { Component } from "react";
import { colors } from "../general/constants";

interface ChatraProps {}

class Chatra extends Component<ChatraProps> {
  componentDidMount() {
    (window as any).ChatraID = "38RWm9wEWfoWWHmSM";
    const chatraScript = document.createElement("script");
    chatraScript.async = true;
    chatraScript.src = "https://call.chatra.io/chatra.js";
    document.head.appendChild(chatraScript);
  }

  render() {
    return null;
  }
}
declare global {
  interface Window {
    ChatraSetup: {
      chatWidth: number;
      chatHeight: number;
      colors: {
        buttonText: string;
        buttonBg: string;
      };
    };
  }
}

window.ChatraSetup = {
  chatWidth: 500,
  chatHeight: 500,
  colors: {
    //if (<style>@media (max-width: 1200px)</style>)  //weiß nicht wie es geht
    //{
    buttonText: colors.black /* chat button text color */,
    buttonBg: colors.companycolor /* chat button background color */,
    //}
    /* else
    {
      buttonText: colors.white /* chat button text color ,
      buttonBg: colors.companycolor /* chat button background color ,
    } */
  },
};

export default Chatra;
