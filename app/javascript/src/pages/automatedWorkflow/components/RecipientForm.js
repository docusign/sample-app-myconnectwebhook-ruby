import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Form } from "react-bootstrap";
import { SubmitButton } from "../../../components/SubmitButton";

export function RecipientForm({
  userData,
  errors,
  onChange,
  onSubmit,
  loading,
}) {
  const { t } = useTranslation("AutomatedWorkflow");

  return (
    <div className="request-form-card col-6">
      <div className="form-holder bg-white pt-5 pb-5">
        <h1 className="mb-4">{t("Title")}</h1>
        <p className="mb-4">{t("SubTitle")}</p>
        <form onSubmit={onSubmit} noValidate>
          {errors?.onSubmit && (
            <div className="alert alert-danger mt-2">{errors?.onSubmit}</div>
          )}
          <div className="recipient-wrapper d-flex">
            <div className="recipient-full-name-wrapper d-flex">
              <Form.Group controlId="recipient-full-name">
                <Form.Control
                  className="input-text-sm"
                  isInvalid={errors?.fullName}
                  type="text"
                  placeholder={t("Recipient.FullName")}
                  name="fullName"
                  value={userData.fullName}
                  onChange={onChange}
                  disabled={loading}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.fullName}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="recipient-email-wrapper d-flex">
              <Form.Group controlId="recipient-email">
                <Form.Control
                  className="input-text-m"
                  isInvalid={errors?.email}
                  type="text"
                  placeholder={t("Recipient.Email")}
                  name="email"
                  value={userData.email}
                  onChange={onChange}
                  disabled={loading}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.email}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>
          <div className="buttons-group d-flex pt-3">
            <SubmitButton loading={loading}>{t("SubmitButton")}</SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
}

RecipientForm.propTypes = {
  userData: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

RecipientForm.defaultProps = {
  errors: {},
};
