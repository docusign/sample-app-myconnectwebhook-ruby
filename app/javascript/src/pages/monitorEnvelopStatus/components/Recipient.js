import React from "react";
import PropTypes from "prop-types";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export function Recipient({ recipient, onDelete, onChange, errors, loading }) {
  const { t } = useTranslation("MonitorEnvelopStatus");
  return (
    <div className="recipient-wrapper d-flex">
      <div className="recipient-full-name-wrapper d-flex">
        <Form.Group controlId={`recipient-full-name-${recipient.id}`}>
          <Form.Control
            className="input-text-sm"
            isInvalid={errors?.fullName}
            type="text"
            placeholder={t("Recipient.FullNamePlaceholder")}
            name="fullName"
            value={recipient.fullName}
            onChange={onChange}
            disabled={loading}
          />
          <Form.Control.Feedback type="invalid">
            {errors?.fullName}
          </Form.Control.Feedback>
        </Form.Group>
      </div>
      <div className="recipient-email-wrapper d-flex">
        <Form.Group controlId={`recipient-email-${recipient.id}`}>
          <Form.Control
            className="input-text-m"
            isInvalid={errors?.email}
            type="text"
            placeholder={t("Recipient.Emaillaceholder")}
            name="email"
            value={recipient.email}
            onChange={onChange}
            disabled={loading}
          />
          <Form.Control.Feedback type="invalid">
            {errors?.email}
          </Form.Control.Feedback>
        </Form.Group>
      </div>
      <div className="recipient-email-delete-button-wrapper">
        <Button onClick={onDelete} className="btn-img" disabled={loading}>
          <img
            src="/images/trash-m.png"
            alt={t("Recipient.DeleteRecipientButton")}
          />
        </Button>
      </div>
    </div>
  );
}

Recipient.propTypes = {
  recipient: PropTypes.shape({
    id: PropTypes.number.isRequired,
    fullName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
  }),
  loading: PropTypes.bool.isRequired,
};

Recipient.defaultProps = {
  errors: {},
};
