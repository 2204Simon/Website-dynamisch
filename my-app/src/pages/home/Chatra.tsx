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

export default Chatra;
