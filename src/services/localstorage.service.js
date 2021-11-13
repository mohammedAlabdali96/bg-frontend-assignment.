
const setToken = tokenObj => {
    localStorage.setItem('access_token', tokenObj.accessToken);
    localStorage.setItem('refresh_token', tokenObj.refreshToken);
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
    localStorage.removeItem('user');
}

const setUser = userObj => {
    localStorage.setItem('user', JSON.stringify(userObj));
}
const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

const isLoggedIn = () => {
    return !!getUser();
}
export default {
    setToken,
    getAccessToken,
    getRefreshToken,
    clearToken,

    isLoggedIn,
    getUser,
    setUser,
};
    