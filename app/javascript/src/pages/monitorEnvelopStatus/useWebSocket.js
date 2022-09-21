import { useEffect, useRef, useState } from "react";
import { createConsumer } from "@rails/actioncable";

export const useWebSocket = (url, channel) => {
  const consumer = useRef(null);
  const [connected, setConnected] = useState(false);

  const connect = (callback) => {
    consumer.current = createConsumer(url);
    consumer.current.subscriptions.create(channel, {
      connected: () => setConnected(true),
      disconnected: () => setConnected(false),
      received: callback,
    });
  };

  const disconnect = () => {
    if (consumer.current) {
      consumer.current.subscriptions.remove(channel);
      consumer.current = null;
    }
  };

  useEffect(() => () => disconnect(), []);

  return [connect, disconnect, connected];
};
