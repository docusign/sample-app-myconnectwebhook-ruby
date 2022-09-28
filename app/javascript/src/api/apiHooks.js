import { useState } from "react";

export const useAPI = (apiCalls) => {
  const [state, setState] = useState(
    Object.keys(apiCalls).map((key) => ({ key, isLoading: false }))
  );

  const boundApiCalls = {};
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const key in apiCalls) {
    const apiCall = apiCalls[key];
    if (typeof apiCall === "function") {
      boundApiCalls[key] = async (...args) => {
        setState((prevState) =>
          prevState.map((value) =>
            value.key === key ? { key, isLoading: true } : value
          )
        );
        const result = await apiCall(...args);
        setState((prevState) =>
          prevState.map((value) =>
            value.key === key ? { key, isLoading: false } : value
          )
        );
        return result;
      };
    }
  }
  return [state.some((x) => x.isLoading), boundApiCalls];
};
