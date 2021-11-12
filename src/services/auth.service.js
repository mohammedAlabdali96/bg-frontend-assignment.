import axios from "./axios";
import { SERVER_URL } from "../config.json";

const login = (id, password) => {
    return axios.post(`${SERVER_URL}/auth/login`, {
        email: id,
        password,
    }).then(response => {

    }, error => {

    });
}

const logout = () => {
    localStorage.removeItem("user")
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}


export default {
    login,
    logout,
    getCurrentUser
}