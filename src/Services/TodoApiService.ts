import ax from "axios";
import { API_URL } from "../Constants";

export const GetTodos = () => {
  return ax.get(`${API_URL}`);
};

export const AddTodo = (data: TodoItem) => {
  return ax(`${API_URL}`, {
    method: "POST",
    data,
  });
};

export const UpdateTodo = (data: TodoItem) => {
  return ax(`${API_URL}/${data.id}`, {
    method: "PATCH",
    data,
  });
};

export const DeleteTodo = (data: TodoItem) => {
  return ax(`${API_URL}/${data.id}`, {
    method: "DELETE",
    data,
  });
};
