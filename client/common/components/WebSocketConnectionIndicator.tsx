import * as React from 'react';
import FontAwesome from './FontAwesome';

interface WebSocketConnectionIndicatorProps {
    isConnected: boolean
}

const WebSocketConnectionIndicator = (props: WebSocketConnectionIndicatorProps) => (
    <span className={props.isConnected ? 'text-success' : 'text-danger'}>
    <FontAwesome prefix="fas" name="circle"/>
  </span>
);

export default WebSocketConnectionIndicator;
