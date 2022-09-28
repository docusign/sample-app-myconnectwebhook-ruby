import { useTranslation } from 'react-i18next';
import * as EmailValidator from 'email-validator';

export const useValidator = () => {
  const { t } = useTranslation('AutomatedWorkflow');
  const objectIsEmpty = (obj) => obj
    && Object.keys(obj).length === 0
    && Object.getPrototypeOf(obj) === Object.prototype;

  const formIsValid = (userData) => {
    const { fullName, email } = userData;
    const errors = {};
    if (!fullName) {
      errors.fullName = t('Error.FullNameIsRequired');
    }
    if (!email) {
      errors.email = t('Error.EmailIsRequired');
    } else if (!EmailValidator.validate(email)) {
      errors.email = t('Error.EmailFormatIsWrong');
    }
    return [objectIsEmpty(errors), errors];
  };

  return formIsValid;
};
