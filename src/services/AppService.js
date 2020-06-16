import Axios from 'axios';
import {
    TOPTRENDING_IDEAS_URL,
    TOPCONTRIBUTORS_URL,
    IDEASTATS_URL,
    IDEAS_URL,
    FOR_IDEAS_URL,
    ALLRECENTREQUEST_URL,
    MYIDEA_URL,
    ALLUSERS_URL,
    CATEGORIES_URL,
    SEARCH_USERSBY_NAME_URL,
    SEARCH_USERSBY_EMAILID_URL,
    RECENTREQUEST_URL,
    RECENTLY_SUBMITTED_URL,
    PUT_CHANGE_USER_ROLE_ADMIN,
    ACTIVE_CATEGORIES_URL,
    PUT_POST_CATEGORIES
} from '../Config/ServiceUrl';
import { getHeaders } from '../Utility/CommonFunctions';

//Service call to get top trending ideas to display in dashboard
export const getTopTrendingIdeas = () => {
    const headers = getHeaders();
    return Axios.get(`${TOPTRENDING_IDEAS_URL}`, { headers });
}

//Service call to get top contributors to display in dashboard
export const getTopContributors = () => {
    const headers = getHeaders();
    return Axios.get(`${TOPCONTRIBUTORS_URL}`, { headers });
}

//Service call to get Idea Stats to display in dashboard
export const getIdeaStats = (Key) => {
    const headers = getHeaders();
    return Axios.get(`${IDEASTATS_URL}?duration=${Key}`, { headers });
}

//Service call to get all details to display in popup
export const getIdeaDetailsById = (ideaId) => {
    const headers = getHeaders();
    return Axios.get(`${IDEAS_URL}${ideaId}`, { headers });
}

//Service call to post idea like from display in popup
export const postIdeaLike = (ideaId) => {
    const headers = getHeaders();
    return Axios.post(`${IDEAS_URL}${ideaId}/like`, '', { headers });
}

//Service call to post idea dislike from display in popup
export const postIdeaDisLike = (ideaId) => {
    const headers = getHeaders();
    return Axios.post(`${IDEAS_URL}${ideaId}/dislike`, '', { headers });
}

//Service call to get my ideas in myideas page
export const getMyIdeas = (pagination) => {
    const headers = getHeaders();
    return Axios.get(`${FOR_IDEAS_URL}?pageNumber=${pagination.current - 1}&pageSize=${pagination.pageSize}`, { headers });
}

//Service call to save and submit idea
export const saveAndSubmitIdeaById = (requestParam, ideaId) => {
    const headers = getHeaders();
    return Axios.put(`${IDEAS_URL}${ideaId}`, JSON.stringify(requestParam), { headers });
}

//Service call to GET recent request to display in dashboard
export const getRecentRequest = () => {
    const headers = getHeaders();
    return Axios.get(`${RECENTREQUEST_URL}`, { headers });
}

//Service call to GET my idea to display in dashboard
export const getMyIdeaRequest = () => {
    const headers = getHeaders();
    return Axios.get(`${MYIDEA_URL}`, { headers });
}

//Service call to GET my idea to display in dashboard
export const getAllRecentRequest = (pagination) => {
    const headers = getHeaders();
    return Axios.get(`${ALLRECENTREQUEST_URL}pageNumber=${pagination.current - 1}&pageSize=${pagination.pageSize}`, { headers });
}

//Service call to get all users i.e registered
export const getAllRegisteredUsers = (pagination) => {
    const headers = getHeaders();
    return Axios.get(`${ALLUSERS_URL}pageNumber=${pagination.current - 1}&pageSize=${pagination.pageSize}`, { headers });
}

//Service call to get all Categories
export const getAllCategories = (pagination) => {
    const headers = getHeaders();
    return Axios.get(`${CATEGORIES_URL}pageNumber=${pagination.current - 1}&pageSize=${pagination.pageSize}`, { headers });
}

//Service call to get all user by name search
export const getUsersByName = (pagination, name) => {
    const headers = getHeaders();
    return Axios.get(`${SEARCH_USERSBY_NAME_URL}pageNumber=${pagination.current - 1}&pageSize=${pagination.pageSize}&name=${name}`, { headers });
}

//Service call to get all user by emailId search
export const getUsersByEmailID = (pagination, emailID) => {
    const headers = getHeaders();
    return Axios.get(`${SEARCH_USERSBY_EMAILID_URL}pageNumber=${pagination.current - 1}&pageSize=${pagination.pageSize}&email=${emailID}`, { headers });
}

//Service call to get Recently Submitted Ideas
export const getRecentlySubmittedIdeas = () => {
    const headers = getHeaders();
    return Axios.get(`${RECENTLY_SUBMITTED_URL}`, { headers });
}

//Service call to put Activate/Deactivate users role
export const putChangeUserRole = (userId, roleType, status) => {
    const headers = getHeaders();
    return Axios.put(`${PUT_CHANGE_USER_ROLE_ADMIN}${userId}/status?roleType=${roleType}&status=${status}`, '', { headers });
}
//Service call to get active categories 
export const getActiveCategories = () => {
    const headers = getHeaders();
    return Axios.get(`${ACTIVE_CATEGORIES_URL}`, { headers });
}

//Service call to create new idea
export const createNewIdea = (requestParam) => {
    const headers = getHeaders();
    return Axios.post(`${FOR_IDEAS_URL}`, JSON.stringify(requestParam), { headers });
}

//Service call to edit  addCategorie

export const putCategories = (userId, requestParam) => {
    const headers = getHeaders();
    return Axios.put(`${PUT_POST_CATEGORIES}/${userId}`, JSON.stringify(requestParam), { headers });
}
//Service call to edit  editCategorie
export const postCategories = (requestParam) => {
    const headers = getHeaders();
    return Axios.post(`${PUT_POST_CATEGORIES}`, JSON.stringify(requestParam), { headers });
}
