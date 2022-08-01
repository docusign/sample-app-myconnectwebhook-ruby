import axios from "./interceptors";

export async function getStatus() {
  const response = await axios.get("/session", {
    withCredentials: true,
  });
  return {
    loggedIn: !!response.data.ds_access_token,
    sessionId: response.data.session_id,
  };
}

export async function logIn(redirectUrl) {
  await axios.post(
    "/api/docusign/auth/jwt_auth.json",
    {
      return_to: redirectUrl,
    },
    {
      withCredentials: true,
    }
  );
}

export async function logOut() {
  await axios.delete("/session", {
    withCredentials: true,
  });
}
