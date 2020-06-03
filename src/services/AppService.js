import Axios from 'axios';
import { TOPTRENDING_IDEAS_URL,
         TOPCONTRIBUTORS_URL,
         IDEASTATS_URL,
         IDEADETAILS_BYID_URL, 
         IDEA_LIKE_URL } from '../Config/ServiceUrl';
import { getHeaders } from '../Utility/CommonFunctions';
import { getToken } from '../components/Auth/Auth';

//Service call to get top trending ideas to display in dashboard
export const getTopTrendingIdeas = () => {
    const headers = getHeaders();
    console.log(headers.Authorization)
    return Axios.get(`${TOPTRENDING_IDEAS_URL}`, { headers });
}

//Service call to get top contributors to display in dashboard
export const getTopContributors = () => {
    const headers = getHeaders();
    const hdata = {headers : { Authorization: headers.Authorization}}
    console.log(hdata)

    return Axios.get(`${TOPCONTRIBUTORS_URL}`, { hdata });
}

//Service call to get Idea Stats to display in dashboard
export const getIdeaStats = (Key) => {
    const headers = getHeaders();
    return Axios.get(`${IDEASTATS_URL}${Key}`, { headers });
}

//Service call to get all details to display in popup
export const getIdeaDetailsById = (ideaId) => {
    const headers = getHeaders();
    console.log(headers.Authorization)
    return Axios.get(`${IDEADETAILS_BYID_URL}${ideaId}`,{ headers }); 
}

//Service call to post idea like from display in popup
export const postIdeaLike = (ideaId) => {
    const token = getToken();
    return Axios.post(`${IDEA_LIKE_URL}${ideaId}`+'/like',{
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    }); 
}

