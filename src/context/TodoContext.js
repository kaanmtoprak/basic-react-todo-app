import { createContext, useState, useEffect, useContext } from "react";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todo, setTodo] = useState("");
  const [controlLocal, setControlLocal] = useState(false);
  const [controldelete, setControldelete] = useState(false);
  const [indexItem, setIndexItem] = useState(-1);
  const local = JSON.parse(localStorage.getItem("todos"));

  useEffect(() => {
    if (local === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else if (todo === "") {
      console.log(" doldurunuz");
    } else {
      local.push(todo);
      localStorage.setItem("todos", JSON.stringify(local));
    }
    if (indexItem >= 0 && controldelete === true) {
      local.splice(indexItem, 1);
      localStorage.setItem("todos", JSON.stringify(local));
      setControldelete(false);
    }
    setTodo("");

    console.log(local);
  }, [todo, local, indexItem, controldelete, setControldelete]);

  const values = {
    todo,
    setTodo,
    local,
    controlLocal,
    setControlLocal,
    indexItem,
    setIndexItem,
    controldelete,
    setControldelete,
  };

  return <TodoContext.Provider value={values}>{children}</TodoContext.Provider>;
};

export const useTodos = () => useContext(TodoContext);
