import axios from "./axios";

import { SERVER_URL } from "../config.json";

const listUnits = () => {
  return axios
    .get(`${SERVER_URL}/units`)
    .then(({data}) => {
      return data.data;
    });
};

export default {
  listUnits,
};