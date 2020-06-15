export const TOKEN_KEY = 'tokenId';
export const USER_TYPE ='userType';
export const USER_EMAIL = 'userEmail';
export const setUserType= userType =>{
    localStorage.setItem(USER_TYPE,userType);
}
export const setUserEmail = userEmail =>{
    localStorage.setItem(USER_TYPE,userEmail);
}

export const getUserType = ()=> localStorage.getItem(USER_TYPE);

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = token => {
    localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_TYPE);
    localStorage.removeItem(USER_EMAIL);
};