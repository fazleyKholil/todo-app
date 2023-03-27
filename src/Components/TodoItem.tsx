import React from "react";
import {
  MDBCheckbox,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBTooltip,
} from "mdb-react-ui-kit";
import TodoDueWarning from "./TodoDueWarning";

interface TodoItemProps {
  todo: TodoItem;
  toggleComplete: ToggleComplete;
  onDeleteTodo: DeleteToDo;
  onEditTodo: EditTodo;
}

const isDateDue = (due: Date): boolean => due <= new Date();

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  toggleComplete,
  onDeleteTodo,
  onEditTodo,
}) => {
  return (
    <MDBListGroup
      data-testid="todo-item"
      horizontal
      className={
        todo.Done
          ? "rounded-0 bg-transparent completed"
          : "rounded-0 bg-transparent"
      }
    >
      <MDBListGroupItem className="d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
        <MDBCheckbox
          name="flexCheck"
          id="flexCheckChecked"
          data-testid="todo-item-check"
          checked={todo.Done}
          onChange={() => toggleComplete(todo)}
        />
      </MDBListGroupItem>
      <MDBListGroupItem className="px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent todo-item ">
        {" "}
        <p className="lead fw-normal mb-0" data-testid="todo-name">
          {todo.Name}
        </p>
      </MDBListGroupItem>
      <MDBListGroupItem className="px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent todo-item ">
        {" "}
        <p className="lead fw-normal mb-0" data-testid="todo-text">
          {todo.Text}
        </p>
      </MDBListGroupItem>

      {/* if due date is passed, show warning */}
      {isDateDue(new Date(todo.Due)) && <TodoDueWarning due={todo.Due} />}

      <MDBListGroupItem className="ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
        <div className="d-flex flex-row justify-content-end mb-1">
          <MDBTooltip tag="a" wrapperProps={{ href: "#!" }} title="Edit todo">
            <MDBIcon
              onClick={() => onEditTodo(todo)}
              data-testid="todo-item-edit"
              fas
              icon="pencil-alt"
              className="me-3"
              color="info"
            />
          </MDBTooltip>

          <MDBTooltip tag="a" wrapperProps={{ href: "#!" }} title="Delete todo">
            <MDBIcon
              onClick={() => onDeleteTodo(todo)}
              data-testid="todo-item-delete"
              fas
              icon="trash-alt"
              color="danger"
            />
          </MDBTooltip>
        </div>
        <div className="text-end text-muted">
          <MDBTooltip
            tag="a"
            wrapperProps={{ href: "#!" }}
            title="Created date"
          >
            <p className="small text-muted mb-0" data-testid="todo-due">
              <MDBIcon fas icon="info-circle" className="me-2" />
              {new Date(todo.Due).toDateString()}
            </p>
          </MDBTooltip>
        </div>
      </MDBListGroupItem>
    </MDBListGroup>
  );
};

export default TodoItem;
