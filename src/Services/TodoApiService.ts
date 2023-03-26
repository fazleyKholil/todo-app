import axios from "axios";
import { API_URL } from "../Constants";

export const GetTodos = () => {
  return axios.get(`${API_URL}`);
};

export const AddTodo = (data: TodoItem) => {
  return axios(`${API_URL}`, {
    method: "POST",
    data,
  });
};

export const UpdateTodo = (data: TodoItem) => {
  return axios(`${API_URL}/${data.id}`, {
    method: "PATCH",
    data,
  });
};

export const DeleteTodo = (data: TodoItem) => {
  return axios(`${API_URL}/${data.id}`, {
    method: "DELETE",
    data,
  });
};
