import React, { useEffect } from "react";
import { colors } from "./general/constants";

interface ChatraProps {}

const Chatra: React.FC<ChatraProps> = () => {
  useEffect(() => {
    const loadChatraScript = () => {
      (window as any).ChatraID = "38RWm9wEWfoWWHmSM";
      const chatraScript = document.createElement("script");
      chatraScript.src = "https://call.chatra.io/chatra.js";
      document.body.appendChild(chatraScript);
    };

    const shouldLoadChatra = true;

    if (shouldLoadChatra) {
      loadChatraScript();
    }
  }, []);

  return null;
};

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
