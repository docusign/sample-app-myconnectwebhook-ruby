import React, { useContext } from "react";
import PropTypes from "prop-types";
import parse from "html-react-parser";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import Alert from "react-bootstrap/Alert";
import { Header } from "./Header";
import { Footer } from "./Footer";
import AppContext from "../appContext";

export function Layout({ children }) {
  const { t } = useTranslation("Common");
  const { showAlert, setShowAlert } = useContext(AppContext);

  return (
    <>
      <Helmet>
        <title>{t("ApplicationName")}</title>
      </Helmet>
      <Header />
      <Alert
        show={showAlert}
        variant="warning"
        onClose={() => setShowAlert(false)}
        dismissible
      >
        <Alert.Heading>{parse(t("AlertMessage"))}</Alert.Heading>
      </Alert>
      <main role="main" className="content">
        {children}
      </main>
      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
