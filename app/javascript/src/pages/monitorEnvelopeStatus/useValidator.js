import { useTranslation } from "react-i18next";
import * as EmailValidator from "email-validator";

export const useValidator = () => {
  const { t } = useTranslation("MonitorEnvelopeStatus");

  const objectIsEmpty = (obj) =>
    obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype;

  const validateRecipient = (recipient, recipients) => {
    const errors = {};
    if (!recipient.fullName) {
      errors.fullName = t("Error.FullNameIsRequired");
    }
    if (!recipient.email) {
      errors.email = t("Error.EmailIsRequired");
    } else if (!EmailValidator.validate(recipient.email)) {
      errors.email = t("Error.EmailFormatIsWrong");
    } else if (
      recipients.some(
        (r) => r.id !== recipient.id && r.email === recipient.email
      )
    ) {
      errors.email = t("Error.EmailIsNotUnique");
    }
    return errors;
  };

  const formIsValid = (recipients) => {
    let errors = {};
    recipients.forEach((recipient) => {
      const recipientErrors = validateRecipient(recipient, recipients);
      if (!objectIsEmpty(recipientErrors)) {
        errors = {
          ...errors,
          [recipient.id]: validateRecipient(recipient, recipients),
        };
      }
    });
    return [objectIsEmpty(errors), errors];
  };

  return formIsValid;
};
