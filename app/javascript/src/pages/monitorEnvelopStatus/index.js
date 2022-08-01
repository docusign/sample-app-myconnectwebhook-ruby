import React, { useReducer, useContext } from "react";
import * as API from "../../api/monitorEnvelopStatusAPI";
import * as Mapper from "./mapper";
import { actions, reducer } from "./reducer";
import { useValidator } from "./useValidator";
import { RequestForm } from "./components/RequestForm";
import { ApiDescription } from "./components/ApiDescription";
import { useWebSocket } from "./useWebSocket";
import { useAPI } from "../../api/apiHooks";
import AppContext from "../../appContext";

export function MonitorEnvelopStatus() {
  const { session } = useContext(AppContext);
  const formIsValid = useValidator();
  const [connect, disconnect, connected] = useWebSocket(
    API.getWebSocketConnectUrl(session),
    API.WebSocketChannelName
  );
  const [isLoading, apiCalls] = useAPI(API);

  const initialState = {
    errors: {},
    recipients: [],
    envelopes: [],
    submitted: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAddRecipient = () => {
    disconnect();
    dispatch(actions.addRecipient());
  };

  const handleDeleteRecipient = (id) => {
    dispatch(actions.deleteRecipient(id));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    disconnect();
    const [isValid, errors] = formIsValid(state.recipients);
    dispatch(actions.setErrors(errors));
    if (!isValid) {
      return;
    }

    const submitRequest = {
      signers: state.recipients.map(Mapper.mapRecipientToSigner),
    };
    await apiCalls.submitSigners(submitRequest);
    connect((data) => {
      dispatch(actions.handleGetStatusResponse(data));
    });

    dispatch(actions.mapRecipientsToEnvelops());
  };

  const handleChange = (payload) => {
    dispatch(actions.handleRecipientChange(payload));
  };

  return (
    <section className="monitor-envelop-status-page">
      <div className="container">
        <div className="row">
          <RequestForm
            recipients={state.recipients}
            envelopes={state.envelopes}
            onChange={handleChange}
            onAddRecipient={handleAddRecipient}
            onDeleteRecipient={handleDeleteRecipient}
            onSubmit={handleSubmit}
            submitted={state.submitted}
            loading={isLoading}
            errors={state.errors}
            connected={connected}
          />
          <ApiDescription />
        </div>
      </div>
    </section>
  );
}
