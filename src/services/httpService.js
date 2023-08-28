import axios from "axios";

export const getData = (path) => {
  return axios.get(path);
};
