export const createStoreDataRequest = (userData, agreementData) => ({
  signer_name: userData.fullName,
  signer_email: userData.email,
  status: agreementData.status,
  agreement_id: agreementData.agreementId,
  agreed_on: agreementData.agreedOn,
});
