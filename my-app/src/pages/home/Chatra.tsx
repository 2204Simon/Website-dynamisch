import React, { Component } from "react";

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
      colors: {
        buttonText: string;
        buttonBg: string;
      };
    };
  }
}

window.ChatraSetup = {
  colors: {
    buttonText: "#f0f0f0" /* chat button text color */,
    buttonBg: "#aa7d03" /* chat button background color */,
  },
};

export default Chatra;
