import React from "react";
import PropTypes from "prop-types";
import { Recipient } from "./Recipient";

export const RecipientList = ({
  recipients,
  onChange,
  onDeleteRecipient,
  errors,
  loading,
}) =>
  recipients.map((recipient) => (
    <Recipient
      key={recipient.id}
      recipient={recipient}
      onChange={(event) =>
        onChange({
          id: recipient.id,
          name: event.target.name,
          value: event.target.value,
        })
      }
      onDelete={() => onDeleteRecipient(recipient.id)}
      errors={errors && errors[recipient.id]}
      loading={loading}
    />
  ));

RecipientList.propTypes = {
  recipients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      fullName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ),
  onDeleteRecipient: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};
