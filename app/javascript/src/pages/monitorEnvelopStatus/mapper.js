export const mapRecipientToEnvelop = (recipient) => ({
  id: `${recipient.id}`,
  name: recipient.fullName,
  email: recipient.email,
  status: "<none>",
  timestamp: new Date(),
});

export const mapSignerToEnvelop = (signer) => ({
  id: signer.signer_email,
  name: signer.signer_name,
  email: signer.signer_email,
  status: signer.status ?? "<none>",
  timestamp: new Date(signer.updated_at),
});

export const mapRecipientToSigner = (recipient) => ({
  name: recipient.fullName,
  email: recipient.email,
});
