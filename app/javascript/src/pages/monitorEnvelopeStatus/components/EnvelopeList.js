import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Spinner } from "react-bootstrap";
import { TooltipOverlay } from "./TooltipOverlay";

export function EnvelopeList({ envelopes, connected }) {
  const { t } = useTranslation("MonitorEnvelopeStatus");
  return (
    <table className="envelope-table table table-striped">
      <thead>
        <tr>
          <th>{t("EnvelopeList.Name")}</th>
          <th>{t("EnvelopeList.Email")}</th>
          <th>
            {t("EnvelopeList.Status")}
            <TooltipOverlay
              text={
                connected
                  ? t("EnvelopeList.StatusUpdateIsInProgress")
                  : t("EnvelopeList.StatusUpdateIsNotPossible")
              }
            >
              {connected ? (
                <Spinner
                  className="envelope-status-spinner"
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                <img
                  className="envelope-status-img"
                  src="/images/alert-circle-m.png"
                  alt="disconnected"
                />
              )}
            </TooltipOverlay>
          </th>
          <th>{t("EnvelopeList.Timestamp")}</th>
        </tr>
      </thead>
      <tbody>
        {envelopes.map((envelope) => (
          <tr key={envelope.id}>
            <td>{envelope.name}</td>
            <td>{envelope.email}</td>
            <td>{envelope.status}</td>
            <td>{envelope.timestamp.toLocaleTimeString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

EnvelopeList.propTypes = {
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

EnvelopeList.defaultProps = {
  envelopes: [],
};
