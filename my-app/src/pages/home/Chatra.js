import React, { Component } from "react";

class Chatra extends Component {
  componentDidMount() {
    (function (d, w, c) {
      w.ChatraID = "38RWm9wEWfoWWHmSM";
      var s = d.createElement("script");
      w[c] =
        w[c] ||
        function () {
          (w[c].q = w[c].q || []).push(arguments);
        };
      s.async = true;
      s.src = "https://call.chatra.io/chatra.js";
      if (d.head) d.head.appendChild(s);
    })(document, window, "Chatra");
  }

  render() {
    return null;
  }
}

export default Chatra;
