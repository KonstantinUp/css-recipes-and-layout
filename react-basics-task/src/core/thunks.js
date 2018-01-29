import {push} from "react-router-redux";
import {searchKey} from "./constants";

import {newCategoryCreate, newTaskCreate} from "./utils";
import {setTasks,setCategories,categoriesList,getTasksMap,categoriesMap} from "../state";







export const showDoneTasks = (flag)=> (dispatch, getState) => {
    dispatch(push('?showDoneTasks='+flag));
};

export const findTask = (string)=> (dispatch, getState) => {
    dispatch(push(`?${searchKey}=${string}`))
};






export const addTask = (string,categoryId)=> (dispatch,getState) => {

    let  newTask = newTaskCreate();
    newTask.id = Math.round(Math.random() * 10000);
    newTask.title = string;

    let copyTasksMap = Object.assign({},getTasksMap(getState()) );
    copyTasksMap[newTask.id] = newTask;
    dispatch(setTasks(copyTasksMap));

    let copyCategoryMap = Object.assign({}, categoriesMap(getState()) );
    copyCategoryMap[categoryId].tasks.unshift( newTask.id);
    dispatch(setCategories(copyCategoryMap));

};

let counter=3;
export const addCategory = (string)=> (dispatch,getState) => {

    let  newCategory = newCategoryCreate();
    newCategory.id = ++counter;
    newCategory.title = string;

    let copyCategoryMap = Object.assign({}, categoriesMap(getState()) );

    copyCategoryMap[newCategory.id] = newCategory;


    dispatch(setCategories(copyCategoryMap));
};