import TodoItem from "../Components/TodoItem";
import { action } from "@storybook/addon-actions";

export default {
  title: "TodoItem",
  component: TodoItem,
};

const todo = {
  id: 0,
  done: true,
  name: "Read Book",
  priority: "High",
  due: "2022-01-01",
  text: "Need to read the Accelerate book Building and Scaling high performing Organization",
};

const todoChecked = {
  id: 0,
  done: false,
  name: "Read Book",
  priority: "High",
  due: "2022-01-01",
  text: "Need to read the Accelerate book Building and Scaling high performing Organization",
};

export const NormalTodo = () => (
  <TodoItem
    todo={todo}
    onDeleteTodo={action("onDeleteTodo clicked")}
    onEditTodo={action("onEditTodo clicked")}
    toggleComplete={action("toggleComplete clicked")}
  />
);

export const CheckedTodo = () => (
  <TodoItem
    todo={todoChecked}
    onDeleteTodo={action("onDeleteTodo clicked")}
    onEditTodo={action("onEditTodo clicked")}
    toggleComplete={action("toggleComplete clicked")}
  />
);
