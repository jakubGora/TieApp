import React, { useEffect } from "react";
import "./style/Message.css";

function Message({ message, close }) {
  return (
    <div className="Message">
      <div className="window">
        <div className="window-top">
          <h2>Info</h2>
          <button onClick={() => close()}>X</button>
        </div>

        <p>{message}</p>
      </div>
    </div>
  );
}

export default Message;
