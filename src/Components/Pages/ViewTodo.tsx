import React, { useState, useEffect } from "react";
import Card  from "../UI/Card";
import TodoList from "../TodoList";
import { useNavigate } from "react-router-dom";
import Loader from "../UI/Loader";
import FilterSortWidget from "../UI/FilterSortAddWidget";
import {
  GetTodos,
  UpdateTodo,
  DeleteTodo,
} from "../../Services/TodoApiService";

const Viewtodo: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<TodoItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      let todos = (await GetTodos()).data;
      setList(todos);

      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
    fetchData();
  }, []);

  const toggleComplete: ToggleComplete = async (selectedTodo) => {
    let updatedTodo = { ...selectedTodo, Done: !selectedTodo.done };

    await UpdateTodo(updatedTodo);

    var updatedTodos = list.map((todo) => {
      if (todo === selectedTodo) {
        return updatedTodo;
      }
      return todo;
    });

    setList(updatedTodos);
  };

  const deleteTodo: DeleteToDo = async (todo: TodoItem) => {
    await DeleteTodo(todo);
    setList(list.filter((item) => item.id !== todo.id));
  };

  const editTodo: EditTodo = (todo: TodoItem) => {
    navigate("create", { state: { item: todo } });
  };

  return (
    <Card title="View Todo's">
      {loading && <Loader />}
      <hr className="my-4" />
      <FilterSortWidget />
      <TodoList
        todoList={list}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
      />
    </Card>
  );
};

export default Viewtodo;
