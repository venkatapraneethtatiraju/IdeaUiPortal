import { getAllCategories, getAllRegisteredUsers } from '../../../services/AppService';

// get user data from api
export const getUserData = async (pagination) => {
  return await getAllRegisteredUsers(pagination)
    .then(responses => {
      let data = setUserItem(responses.data.result.content)
      return { data, responses };
    }
    )
    .catch(error => {
      return console.log(error);
    })
}

function setUserItem(result) {
  const newArr = result.map((val, index) => {
    return {
      key: val.userId,
      userName: val.name ? val.name : "- ",
      location: val.location.country ? val.location.country : "-",
      role: val.role ? val.role : "-",
      status: val.enabled ? "Active" : "Deactivated",
      enabled: val.enabled
    };
  })
  return newArr;
};


// get Categories data from api
export const getCategoriesData = async () => {
  return await getAllCategories()
    .then(responses => {
      let data = setItemCategories(responses.data.result)
      return data;
    })
    .catch(error => {
      return console.log(error);
    })
}
function setItemCategories(result) {
  const newArr = result.map((val, index) => {
    return {
      key: val.id,
      categories: val.subCategoryName ? val.subCategoryName : "- ",
      type: val.ideaType ? val.ideaType : "-",
      updatedOn: "-",
      status: val.active ? "Active" : "Deactivated",
      active: val.active
    };
  })
  return newArr;
};




