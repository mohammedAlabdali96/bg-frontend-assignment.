import axios from "./axios";

import { SERVER_URL } from "../config.json";

const listUnits = (page, perPage) => {
  return axios
    .get(`${SERVER_URL}/units?page=${page}&perPage=${perPage}`)
    .then(({ data }) => {
      return data;
    });
};

const getUnit = id => {
  return axios
    .get(`${SERVER_URL}/units/${id}`)
    .then(({ data }) => {
      console.log(data)
      return data;
    });
};
const bookunit = (unitId, year) => {
  return axios
    .post(`${SERVER_URL}/units/book`, {
      unitId,
      year,
    })
    .then((data) => {
        console.log(data)
      return data;
    });
};

export default {
  listUnits,
  getUnit,
  bookunit
};