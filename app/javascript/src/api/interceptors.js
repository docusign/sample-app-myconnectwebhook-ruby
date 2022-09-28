import axios from "axios";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // eslint-disable-next-line no-console
    console.error(`API call failed. Error:  ${error}`);
    return Promise.reject(error);
  }
);

export default axios;
