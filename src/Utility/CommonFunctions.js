import { getToken } from "../components/Auth/Auth";
import { TOP_CONSTRIBUTORS, GET_MYIDEAS_DETAIL } from '../Config/Constants'

//Get headers for request
export const getHeaders = () => {
    const token = getToken();//Get token
    const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    return headers;
};

//To set the new property in array of object
export const addNewProperty = (newResult, actionname) => {

    switch (actionname) {
        case TOP_CONSTRIBUTORS:
            newResult.forEach((element, index) => {
                element.iconName = createIconShortName(element.user.username)
            });
            return newResult.sort(compareValues('totalIdeas', 'desc'));

        case GET_MYIDEAS_DETAIL:
            newResult.forEach((element, index) => {
                element.key = element.id
                element.index = index
                element.ideaSubject = element.title ? element.title : "- "
                element.ideaType = element.categoryName ? element.categoryName : "-"
                element.ideaCategory = element.subcategoryName ? element.subcategoryName : "-"
                element.ideaDescription = element.ideaDescription ? element.ideaDescription : "-"
                element.submittedOn = "-"
                element.status = element.ideaStatus ? element.ideaStatus : "-"
                element.attachment = ''
            });
            return newResult;

        default:
            return newResult;
    }
};

//Create user icon short name
export const createIconShortName = (username) => {
    let iconName = '';
    const nameArr = username.split(' ');
    if (nameArr !== null || nameArr !== undefined) {
        if (nameArr.length === 1) {
            iconName = nameArr[0].toString().substr(0, 1);
        }
        else if (nameArr.length > 1) {
            iconName = nameArr[0].toString().substr(0, 1) + nameArr[nameArr.length - 1].toString().substr(0, 1);
        }
    }
    return iconName;
}

//Sort array by property in asc and dsc order
export const compareValues = (field, order = 'asc') => {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(field) || !b.hasOwnProperty(field)) {
            return 0;
        }
        const varA = (typeof a[field] === 'string')
            ? a[field].toUpperCase() : a[field];
        const varB = (typeof b[field] === 'string')
            ? b[field].toUpperCase() : b[field];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    };
}
