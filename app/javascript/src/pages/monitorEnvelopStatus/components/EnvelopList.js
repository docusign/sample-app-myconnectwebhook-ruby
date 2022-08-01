import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Spinner } from "react-bootstrap";
import { TooltipOverlay } from "./TooltipOverlay";

export function EnvelopList({ envelopes, connected }) {
  const { t } = useTranslation("MonitorEnvelopStatus");
  return (
    <table className="envelop-table table table-striped">
      <thead>
        <tr>
          <th>{t("EnvelopList.Name")}</th>
          <th>{t("EnvelopList.Email")}</th>
          <th>
            {t("EnvelopList.Status")}
            <TooltipOverlay
              text={
                connected
                  ? t("EnvelopList.StatusUpdateIsInProgress")
                  : t("EnvelopList.StatusUpdateIsNotPossible")
              }
            >
              {connected ? (
                <Spinner
                  className="envelop-status-spinner"
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                <img
                  className="envelop-status-img"
                  src="/images/alert-circle-m.png"
                  alt="disconnected"
                />
              )}
            </TooltipOverlay>
          </th>
          <th>{t("EnvelopList.Timestamp")}</th>
        </tr>
      </thead>
      <tbody>
        {envelopes.map((envelop) => (
          <tr key={envelop.id}>
            <td>{envelop.name}</td>
            <td>{envelop.email}</td>
            <td>{envelop.status}</td>
            <td>{envelop.timestamp.toLocaleTimeString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

EnvelopList.propTypes = {
  envelopes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      timestamp: PropTypes.instanceOf(Date).isRequired,
    })
  ),
  connected: PropTypes.bool.isRequired,
};

EnvelopList.defaultProps = {
  envelopes: [],
};
