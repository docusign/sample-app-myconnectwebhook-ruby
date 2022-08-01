import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import { SubmitButton } from "../../../components/SubmitButton";
import { RecipientList } from "./RecipientList";
import { EnvelopList } from "./EnvelopList";

export function RequestForm({
  recipients,
  envelopes,
  onChange,
  onAddRecipient,
  onDeleteRecipient,
  onSubmit,
  submitted,
  errors,
  loading,
  connected,
}) {
  const { t } = useTranslation("MonitorEnvelopStatus");

  return (
    <div className="request-form-card col-lg-6">
      <div className="form-holder bg-white pt-5 pb-5">
        <h1 className="mb-4">{t("Title")}</h1>
        <p className="mb-4">{t("SubTitle")}</p>
        <form
          onSubmit={onSubmit}
          className={submitted ? "was-validated" : ""}
          noValidate
        >
          {!submitted && (
            <RecipientList
              recipients={recipients}
              onChange={onChange}
              onDeleteRecipient={onDeleteRecipient}
              loading={loading}
              errors={errors}
            />
          )}
          <Button className="btn-secondary" onClick={onAddRecipient}>
            <img className="img-before" src="/images/plus-m.png" alt="" />
            {t("AddRecipientButton")}
          </Button>
          <hr />
          {submitted && (
            <>
              <h3 className="mb-4">{t("EnvelopesTitle")}</h3>
              <EnvelopList envelopes={envelopes} connected={connected} />
            </>
          )}
          {!submitted && (
            <SubmitButton loading={loading}>{t("SubmitButton")}</SubmitButton>
          )}
        </form>
      </div>
    </div>
  );
}

RequestForm.propTypes = {
  recipients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      fullName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ),
  envelopes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      timestamp: PropTypes.instanceOf(Date),
    })
  ),
  onChange: PropTypes.func.isRequired,
  onAddRecipient: PropTypes.func.isRequired,
  onDeleteRecipient: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitted: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  connected: PropTypes.bool.isRequired,
};

RequestForm.defaultProps = {
  envelopes: [],
  recipients: [],
};
