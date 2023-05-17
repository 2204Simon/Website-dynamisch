import { Component } from "react";
import { colors } from "./general/constants";

interface ChatraProps {}

class Chatra extends Component<ChatraProps> {
  componentDidMount() {
    (window as any).ChatraID = "38RWm9wEWfoWWHmSM";
    const chatraScript = document.createElement("script");
    chatraScript.defer = true;
    chatraScript.setAttribute("crossorigin", "anonymous");
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
  buttonSize: 49,
  colors: {
    buttonText: colors.companycolor,
    buttonBg: colors.black,
  },
};

export default Chatra;
