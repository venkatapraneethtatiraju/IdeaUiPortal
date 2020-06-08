import Axios from 'axios';
import {
    TOPTRENDING_IDEAS_URL,
    TOPCONTRIBUTORS_URL,
    IDEASTATS_URL,
    IDEAS_URL,
    GET_MYIDEADS_URL
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
    return Axios.get(`${IDEASTATS_URL}${Key}`, { headers });
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
    return Axios.get(`${GET_MYIDEADS_URL}?pageNumber=${pagination.current - 1}&pageSize=${pagination.pageSize}`, { headers });
}

//Service call to save and submit idea
export const saveAndSubmitIdeaById = (requestParam, ideaId) => {
    const headers = getHeaders();
    return Axios.put(`${IDEAS_URL}${ideaId}`, JSON.stringify(requestParam), { headers });
}

