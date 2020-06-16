import React,{Button} from 'react'
import {
    USERS,
    XEBIAOFFICE,
    ROLE,
    JOINEDON,
    STATUS,
    SUCCESS
    
} from '../../../Config/Constants';

import {getAllCategories, getAllRegisteredUsers } from '../../../services/AppService';



// get user data from api

export const getUserData = async(pagination)=>{

    return await getAllRegisteredUsers(pagination)
         .then(responses => {
          
              console.log(responses,"12e");
             let data=  setUserItem(responses.data.content)
            return {data,responses};
          }
         )
         .catch(error => {
            return  console.log(error);
         })
        }
    function setUserItem(result) {
      const newArr = result.map((val, index) => {
      return {
         key: val.userId,
         userName: val.name ? val.name : "- ",
         location:val.location.country? val.location.country:"-",
         role: val.role? val.role:"-",
         status: val.enabled ? "Active": "Deactivated"
     };
   })
   return newArr;
 };


 // get Categories data from api

export const getCategoriesData = async(pagination)=>{

    return await getAllCategories(pagination)
         .then(response => {
             let data=  setItemCategories(response.data.result)
             return data;
         })
         .catch(error => {
            return  console.log(error);
         })
        }
    function setItemCategories(result) {
      const newArr = result.map((val, index) => {
      return {
         key: val.id,
         categories: val.subCategoryName ? val.subCategoryName : "- ",
         type:val.ideaType? val.ideaType:"-",
         updatedOn: "-",
         status: val.active ? "Active": "Deactivated"
     };
   })
   return newArr;
 };
 



