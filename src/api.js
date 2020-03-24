import axios from "axios";
import {NetErrorStatus} from "./const";

const NO_ERROR_CODE = 200;

const createAPI = (onCheckNetError) => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-3.appspot.com/six-cities`,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    onCheckNetError(NetErrorStatus.NO_ERROR, NO_ERROR_CODE, ``);
    return response;
  };

  const onFail = (err) => {
    const {response} = err;
    const {status, data} = response;
    const errorText = `Error ${status}, ${data.error}`;
    onCheckNetError(NetErrorStatus.ERROR, status, errorText);
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default createAPI;
