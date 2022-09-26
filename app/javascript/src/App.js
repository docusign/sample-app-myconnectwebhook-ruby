import React, { Suspense, useState, useEffect, useMemo } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AppContext from "./appContext";
import { logIn, logOut, getStatus } from "./api/auth";
import { Layout } from "./components/Layout";
import { Home } from "./pages/home";
import { MonitorEnvelopeStatus } from "./pages/monitorEnvelopeStatus";
import { AutomatedWorkflow } from "./pages/automatedWorkflow";

export function App() {
  const [logged, setLogged] = useState(false);
  const [session, setSession] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  const updateLoginStatus = async () => {
    const { loggedIn, sessionId } = await getStatus();
    setLogged(loggedIn);
    setSession(sessionId);
    return loggedIn;
  };

  useEffect(() => {
    updateLoginStatus();
  }, []);

  const handleLogIn = async (redirectUrl) => {
    await logIn(redirectUrl);
    await updateLoginStatus();
  };

  const handleLogOut = async () => {
    await logOut();
    await updateLoginStatus();
    navigate("/");
  };

  const routes = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/monitorEnvelopeStatus" element={<MonitorEnvelopeStatus />} />
      <Route path="/automatedWorkflow" element={<AutomatedWorkflow />} />
    </Routes>
  );

  const contextValue = useMemo(
    () => ({
      logged,
      session,
      showAlert,
      setShowAlert,
      updateLoginStatus,
      handleLogIn,
      handleLogOut,
    }),
    [logged, session, showAlert]
  );

  return (
    <Suspense fallback="">
      <AppContext.Provider value={contextValue}>
        <Layout>{routes}</Layout>
      </AppContext.Provider>
    </Suspense>
  );
}
