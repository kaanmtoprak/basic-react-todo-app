import { createContext, useState, useEffect, useContext } from "react";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todo, setTodo] = useState("");
  const [controlLocal, setControlLocal] = useState(false);
  const [controldelete, setControldelete] = useState(false);
  const [indexItem, setIndexItem] = useState(-1);
  const [editItems, setEditItems] = useState({
    value: "",
    index: "",
  });
  const [editControl, setEditControl] = useState(false);
  const local = JSON.parse(localStorage.getItem("todos"));

  useEffect(() => {
    if (local === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else if (todo === "") {
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
    if (editItems.value !== "") {
      local[editItems.index] = editItems.value;
      localStorage.setItem("todos", JSON.stringify(local));
      setEditItems({
        value: "",
        index: "",
      });
      setEditControl(false);
    }
  }, [
    todo,
    local,
    indexItem,
    controldelete,
    setControldelete,
    editItems,
    setEditControl,
  ]);

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
    editItems,
    setEditItems,
    editControl,
    setEditControl,
  };

  return <TodoContext.Provider value={values}>{children}</TodoContext.Provider>;
};

export const useTodos = () => useContext(TodoContext);
