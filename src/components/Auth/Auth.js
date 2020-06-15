//
import {
    TOKEN_KEY,
    USERNAME_KEY,
    USERID_KEY,
    USERROLE_KEY
} from '../../Config/Constants';

export const USER_TYPE ='userType';
export const USER_EMAIL = 'userEmail';
export const setUserType= userType =>{
    localStorage.setItem(USERROLE_KEY,userType);
}
export const setUserEmail = userEmail =>{
    localStorage.setItem(USER_TYPE,userEmail);
}

export const getUserType = ()=> localStorage.getItem(USER_TYPE);

export const isAuthenticated = () => (localStorage.getItem(TOKEN_KEY) !== null
    && localStorage.getItem(USERNAME_KEY) !== null
    && localStorage.getItem(USERID_KEY) !== null
    && localStorage.getItem(USERROLE_KEY) !== null);

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUserName = () => localStorage.getItem(USERNAME_KEY);
export const getUserId = () => localStorage.getItem(USERID_KEY);
export const getUserRole = () => localStorage.getItem(USERROLE_KEY);

export const login = loginData => {
    localStorage.setItem(TOKEN_KEY, loginData.token);
    localStorage.setItem(USERNAME_KEY, loginData.result.name);
    localStorage.setItem(USERID_KEY, loginData.result.userId);
    localStorage.setItem(USERROLE_KEY, loginData.result.role);
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(USERID_KEY);
    localStorage.removeItem(USERROLE_KEY);
};
