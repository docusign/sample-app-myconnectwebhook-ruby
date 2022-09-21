import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { EnvelopeList } from "./EnvelopeList";
import parse from "html-react-parser";

export function ConfirmationComplete({
  envelopes,
  connected,
  submitted,
}) {
  const { t } = useTranslation("MonitorEnvelopeStatus");

  return (
    <div className="request-form-card col-6">
      <div className="form-holder bg-white pt-5 pb-5">
        <h1 className="mb-4">{t("ConfirmationComplete.Title")}</h1>
        <div className="mb-4">{parse(t("ConfirmationComplete.SubTitle"))}</div>
        <form>
          {submitted && (
            <>
              <h3 className="mb-4">{t("EnvelopesTitle")}</h3>
              <EnvelopeList envelopes={envelopes} connected={connected} />
            </>
          )}
        </form>
      </div>
    </div>
  );
}

ConfirmationComplete.propTypes = {
  envelopes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      timestamp: PropTypes.instanceOf(Date),
    })
  ),
  connected: PropTypes.bool.isRequired,
  submitted: PropTypes.bool.isRequired,
}

ConfirmationComplete.defaultProps = {
  envelopes: [],
};
