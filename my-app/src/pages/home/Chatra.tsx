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
      buttonSize: number;
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
  buttonSize: 60,
  colors: {
    buttonText: colors.black,
    buttonBg: colors.companycolor,
  },
};

export default Chatra;
