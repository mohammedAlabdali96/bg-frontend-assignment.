
const setToken = tokenObj => {
    localStorage.setItem('access_token', tokenObj.access_token);
    localStorage.setItem('refresh_token', tokenObj.refresh_token);
}
const getAccessToken = () => {
    return localStorage.getItem('access_token');
}
const getRefreshToken = () => {
    return localStorage.getItem('refresh_token');
}
const clearToken = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
}

const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : {};
}
export default {
    setToken,
    getAccessToken,
    getRefreshToken,
    clearToken,

    getUser,
};
    