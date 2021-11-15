import axios from "./axios";

import { SERVER_URL } from "../config.json";

const listUnits = () => {
  return axios
    .get(`${SERVER_URL}/units`)
    .then(({ data }) => {
      return data.data;
    });
};

const getUnit = id => {
  return axios
    .get(`${SERVER_URL}/units/${id}`)
    .then(({ data }) => {
      return data;
    });
};
const bookunit = ({ unitId, year }) => {
  return axios
    .post(`${SERVER_URL}/units/book`, {
      unitId,
      year
    })
    .then(({ data }) => {
      return data;
    });
};

export default {
  listUnits,
  getUnit,
  bookunit
};