// @flow
import React from "react";

import FontAwesome from './FontAwesome';

const WebSocketConnectionIndicator = ({isConnected}: {isConnected: boolean}) => (
        <span className={isConnected ? "text-success" : "text-danger"}><FontAwesome name="circle"/></span>
);

export default WebSocketConnectionIndicator;