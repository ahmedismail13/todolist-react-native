import {
  createContext,
  useReducer,
  useLayoutEffect,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialTodoList = [];

const actions = {
  ADD_TODO: "ADD_TODO",
  DELETE_TODO: "DELETE_TODO",
  COMPLETE_TODO: "COMPLETE_TODO",
  EDIT_TODO: "EDIT_TODO",
  SYNC_TODO: "SYNC_TODO",
};

const todoListReducer = (state, action) => {
  switch (action.type) {
    case actions.SYNC_TODO:
      return action.payload;
    case actions.ADD_TODO:
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 10000) + 1,
          title: action.payload,
          isComplete: false,
        },
      ];
    case actions.DELETE_TODO:
      return state.filter((item) => item.id !== action.payload);
    case actions.COMPLETE_TODO:
      return state.map((item) => {
        if (item.id === action.payload) item.isComplete = !item.isComplete;
        return item;
      });
    case actions.EDIT_TODO:
      return state.map((item) => {
        if (item.id === action.payload.id) item.title = action.payload.title;
        return item;
      });
    default:
      return state;
  }
};

export const TodoListContext = createContext(initialTodoList);

export const TodoListProvider = ({ children }) => {
  const [todo, setTodo] = useState("");
  const [todoList, dispatch] = useReducer(todoListReducer, initialTodoList);

  const saveTodoListToStorage = async () => {
    try {
      await AsyncStorage.setItem("todoList", JSON.stringify(todoList));
    } catch (error) {
      console.log(error);
    }
  };

  const getTodoListFromStorage = async () => {
    try {
      const todoList = await AsyncStorage.getItem("todoList");
      if (todoList !== null) {
        dispatch({ type: actions.SYNC_TODO, payload: JSON.parse(todoList) });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    getTodoListFromStorage();
  }, []);

  useEffect(() => {
    saveTodoListToStorage();
  }, [todoList]);

  const value = {
    todo,
    setTodo,
    todoList,
    addTodoItem: (title) =>
      dispatch({ type: actions.ADD_TODO, payload: title }),
    deleteTodoItem: (id) =>
      dispatch({ type: actions.DELETE_TODO, payload: id }),
    completeTodoItem: (id) =>
      dispatch({ type: actions.COMPLETE_TODO, payload: id }),
    editTodoItem: (id, title) =>
      dispatch({ type: actions.EDIT_TODO, payload: { id, title } }),
  };

  return (
    <TodoListContext.Provider value={value}>
      {children}
    </TodoListContext.Provider>
  );
};
