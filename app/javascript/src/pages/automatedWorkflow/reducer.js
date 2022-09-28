const GET_CLICKWRAP_SUCCESS = "GET_CLICKWRAP_SUCCESS";
const SET_ERRORS = "SET_ERRORS";
const HANDLE_RECIPIENT_CHANGE = "HANDLE_RECIPIENT_CHANGE";
const CLICKWRAP_AGREED = "CLICKWRAP_AGREED";
const CLICKWRAP_DECLINED = "CLICKWRAP_DECLINED";

export const actions = {
  setErrors: (errors) => ({ type: SET_ERRORS, payload: { errors } }),
  handleGetClickWrapResponse: (response) => ({
    type: GET_CLICKWRAP_SUCCESS,
    payload: { response },
  }),
  handleRecipientChange: (payload) => ({
    type: HANDLE_RECIPIENT_CHANGE,
    payload: { ...payload },
  }),
  handleAgreed: (payload) => ({
    type: CLICKWRAP_AGREED,
    payload: { ...payload },
  }),
  handleDeclined: (payload) => ({
    type: CLICKWRAP_DECLINED,
    payload: { ...payload },
  }),
};

export function reducer(state, action) {
  switch (action.type) {
    case GET_CLICKWRAP_SUCCESS: {
      const {
        clickwrap_environment: environment,
        clickwrap_account_id: accountId,
        clickwrap_id: clickwrapId,
        client_user_id: clientUserId,
      } = action.payload.response;
      return {
        ...state,
        clickWrap: {
          ...state.clickWrap,
          environment,
          accountId,
          clickwrapId,
          clientUserId,
        },
        showClickwrap: true,
      };
    }
    case CLICKWRAP_AGREED:
      return {
        ...state,
        clickWrap: {},
        agreementData: { ...action.payload.agreementData },
        agreed: true,
        showClickwrap: false,
      };
    case CLICKWRAP_DECLINED:
      return {
        ...state,
        clickWrap: {},
        agreementData: { ...action.payload.agreementData },
        agreed: false,
        showClickwrap: false,
      };
    case SET_ERRORS:
      return { ...state, errors: action.payload.errors };
    case HANDLE_RECIPIENT_CHANGE: {
      const { name, value } = action.payload;
      return {
        ...state,
        userData: { ...state.userData, [name]: value },
      };
    }
    default:
      return state;
  }
}
