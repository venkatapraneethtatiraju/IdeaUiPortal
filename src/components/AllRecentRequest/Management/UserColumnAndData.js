import React,{Button} from 'react'
import {
    USERS,
    XEBIAOFFICE,
    ROLE,
    JOINEDON,
    STATUS
    
} from '../../../Config/Constants';

import {getAllCategories, getAllRegisteredUsers } from '../../../services/AppService';



// get user data from api

export const getUserData = async()=>{

    return await getAllRegisteredUsers()
         .then(response => {
             let data=  setUserItem(response.data.content)
             return data;
         })
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


 // get user data from api

export const getCategoriesData = async()=>{

    return await getAllCategories()
         .then(response => {
             let data=  setItemCategories(response.data)
             return data;
         })
         .catch(error => {
            return  console.log(error);
         })
        }
    function setItemCategories(result) {
      const newArr = result.map((val, index) => {
      return {
         key: val.userId,
         categories: val.subCategoryName ? val.subCategoryName : "- ",
         type:val.ideaType? val.ideaType:"-",
         updatedOn: "-",
         status: val.active ? "Active": "Deactivated"
     };
   })
   return newArr;
 };
 



