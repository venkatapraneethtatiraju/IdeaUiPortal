import Axios from 'axios';
import { TOPTRENDING_IDEAS_URL, TOPCONTRIBUTORS_URL } from '../Config/ServiceUrl';
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