import { FETCH_TASKS, CREATE_TASKS, UPDATE_TASKS, DELETE_TASKS } from "../types";

export const fetchTasksAction = (data) => {
  return {
    type: FETCH_TASKS,
    payload: data,
  };
};

export const createTaskAction = (data) => {
  return {
    type: CREATE_TASKS,
    payload: data,
  };
};

export const editTaskAction = (taskId, updatedData) => {
  console.log({taskId,updatedData})
  return {
    type:UPDATE_TASKS ,
    payload: { taskId, updatedData },
  }
};


export const deleteTaskAction = (taskId) => {
  return {
    type: DELETE_TASKS,
    payload: {taskId}
  }
}
