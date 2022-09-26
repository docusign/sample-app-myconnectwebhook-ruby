import { WS_CONNECTION_URL } from "env";
import axios from "./interceptors";

export const WebSocketChannelName = "UserMessagesChannel";

export const getWebSocketConnectUrl = (session) =>
  `${WS_CONNECTION_URL}?session_id=${session}`;

export async function submitSigners(request) {
  const response = await axios.post(
    "/api/docusign/bulk_send/process_envelopes.json",
    request,
    {
      withCredentials: true,
    }
  );
  return response.data;
}
