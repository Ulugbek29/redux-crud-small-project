import { CREATE_TASKS, DELETE_TASKS, FETCH_TASKS, UPDATE_TASKS } from "../types";

const initialState = {
  tasks: [],
};

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };

    case CREATE_TASKS:
      const data = [...state.tasks, action.payload];

      return {
        ...state,
        tasks: data,
      };
    
      case UPDATE_TASKS:
        return {
          ...state,
          tasks: state.tasks.map((task, index)=> {
            console.log(task)
            console.log(action.payload.updatedData)
            console.log("1render",action.payload.taskId)
            console.log("1render",index)
            console.log(index == action.payload.taskId)
            return index == action.payload.taskId ? {...task, ...action.payload.updatedData} : task
          })
        }
      
      case DELETE_TASKS:
        console.log(action.payload.taskId)
        console.log(state.tasks.filter((task, index)=> index !== action.payload.taskId))
        return {
          ...state,
          tasks: state.tasks.filter((task, index)=> index !== action.payload.taskId)
        }

    default:
      return state;
  }
};
