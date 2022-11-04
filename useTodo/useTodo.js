import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";

export const useTodo = () => {
  //Para leerlo y que persista

  const initialState = [];

  const init = () => {
    return JSON.parse(localStorage.getItem("todos")) || [];
  };

  const [todos, dispatch] = useReducer(todoReducer, initialState, init);

  //Para guardarlo en el localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleNewToDo = (todo) => {
    const action = {
      type: "Add Todo",
      payload: todo,
    };

    dispatch(action);
  };

  const handleDeleteToDo = (id) => {
    dispatch({
      type: "Remove Todo",
      payload: id,
    });
  };

  const handleToggleToDo = (id) => {
    dispatch({
      type: "Toggle Todo",
      payload: id,
    });
  };

  const toDosCount = todos.length;

  const pendingToDosCount = todos.filter((todo) => !todo.done).length;

  return {
    todos,
    handleNewToDo,
    handleDeleteToDo,
    handleToggleToDo,
    toDosCount,
    pendingToDosCount,
  };
};
