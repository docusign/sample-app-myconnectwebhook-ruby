import React, { useReducer } from "react";
import { useValidator } from "./useValidator";
import * as Mapper from "./mapper";
import { actions, reducer } from "./reducer";
import * as API from "../../api/automatedWorkflowAPI";
import { useAPI } from "../../api/apiHooks";
import { ClickWrap, loadClickwrapApi } from "./components/Clickwrap";
import { RecipientForm } from "./components/RecipientForm";
import { ApiDescription } from "./components/ApiDescription";
import { ConfirmationComplete } from "./components/ConfirmationComplete";

const initialState = {
  clickWrap: {
    environment: "",
    accountId: "",
    clickwrapId: "",
    clientUserId: "",
  },
  userData: {
    fullName: "",
    email: "",
  },
  agreed: false,
  showClickwrap: false,
  errors: {},
};

const orderData = {
  items: [
    { id: 1, name: "Item (1)", price: "$17.01" },
    { id: 2, name: "Postage", price: "$2.01" },
  ],
  total: "$19.02",
};

export function AutomatedWorkflow() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const formIsValid = useValidator();
  const [isLoading, apiCalls] = useAPI({ ...API, loadClickwrapApi });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const [isValid, errors] = formIsValid(state.userData);
    dispatch(actions.setErrors(errors));
    if (!isValid) {
      return;
    }

    const response = await apiCalls.getInitParams();
    await apiCalls.loadClickwrapApi(response.clickwrap_environment);
    dispatch(actions.handleGetClickWrapResponse(response));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(actions.handleRecipientChange({ name, value }));
  };

  const handleAgreed = async (agreementData) => {
    const request = Mapper.createStoreDataRequest(
      state.userData,
      agreementData
    );
    await apiCalls.storeData(request);
    dispatch(actions.handleAgreed({ agreementData }));
  };

  const handleDeclined = (agreementData) => {
    dispatch(actions.handleDeclined(agreementData));
  };

  return (
    <section className="automated-workflow-page">
      <div className="container">
        <div className="row">
          {state.agreed ? (
            <ConfirmationComplete orderData={orderData} />
          ) : (
            <RecipientForm
              userData={state.userData}
              onChange={handleChange}
              onSubmit={handleSubmit}
              errors={state.errors}
              loading={isLoading}
            />
          )}
          <ApiDescription />
          <div id="ds-clickWrap" />
          {state.showClickwrap && (
            <ClickWrap
              elementId="ds-clickWrap"
              accountId={state.clickWrap.accountId}
              clickwrapId={state.clickWrap.clickwrapId}
              clientUserId={state.clickWrap.clientUserId}
              baseUrl={state.clickWrap.environment}
              onAgreed={handleAgreed}
              onDeclined={handleDeclined}
            />
          )}
        </div>
      </div>
    </section>
  );
}
