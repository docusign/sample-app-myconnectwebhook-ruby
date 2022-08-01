import * as Mapper from "./mapper";

const ADD_RECIPIENT = "ADD_RECIPIENT";
const DELETE_RECIPIENT = "DELETE_RECIPIENT";
const SET_ERRORS = "SET_ERRORS";
const HANDLE_GET_STATUS_RESPONSE = "HANDLE_GET_STATUS_RESPONSE";
const MAP_RECIPIENTS_TO_ENVELOPS = "MAP_RECIPIENTS_TO_ENVELOPS";
const HANDLE_RECIPIENT_CHANGE = "HANDLE_RECIPIENT_CHANGE";

export const actions = {
  addRecipient: () => ({ type: ADD_RECIPIENT }),
  deleteRecipient: (id) => ({ type: DELETE_RECIPIENT, payload: { id } }),
  setErrors: (errors) => ({ type: SET_ERRORS, payload: { errors } }),
  handleGetStatusResponse: (response) => ({
    type: HANDLE_GET_STATUS_RESPONSE,
    payload: { response },
  }),
  mapRecipientsToEnvelops: () => ({ type: MAP_RECIPIENTS_TO_ENVELOPS }),
  handleRecipientChange: (payload) => ({
    type: HANDLE_RECIPIENT_CHANGE,
    payload: { ...payload },
  }),
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ADD_RECIPIENT:
      return {
        errors: {},
        recipients: [
          ...state.recipients,
          {
            id:
              state.recipients.length === 0
                ? 0
                : state.recipients[state.recipients.length - 1].id + 1,
            fullName: "",
            email: "",
          },
        ],
        envelopes: [],
        submitted: false,
      };
    case DELETE_RECIPIENT:
      return {
        errors: {},
        recipients: [
          ...state.recipients.filter(
            (recipient) => recipient.id !== action.payload.id
          ),
        ],
        envelopes: [],
        submitted: false,
      };
    case SET_ERRORS:
      return { ...state, errors: action.payload.errors };
    case HANDLE_GET_STATUS_RESPONSE: {
      const updatedEnvelop = Mapper.mapSignerToEnvelop(action.payload.response);
      return {
        ...state,
        envelopes: state.envelopes.map((envelop) =>
          envelop.email === updatedEnvelop.email ? updatedEnvelop : envelop
        ),
      };
    }
    case MAP_RECIPIENTS_TO_ENVELOPS:
      return {
        ...state,
        envelopes: state.recipients.map(Mapper.mapRecipientToEnvelop),
        submitted: true,
      };
    case HANDLE_RECIPIENT_CHANGE: {
      const { id, name, value } = action.payload;
      return {
        ...state,
        recipients: state.recipients.map((recipient) =>
          recipient.id === id ? { ...recipient, [name]: value } : recipient
        ),
      };
    }
    default:
      throw new Error();
  }
};
