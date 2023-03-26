import React, { useState, useEffect } from "react";
import { Card } from "../UI/Card";
import CreateTodoForm from "../CreateTodoForm";
import { Link } from "react-router-dom";
import { MDBIcon, MDBBtn } from "mdb-react-ui-kit";
import { AddTodo, UpdateTodo } from "../../Services/TodoApiService";
import { useNavigate } from "react-router-dom";
import NotificationPanel from "../UI/NotificationPanel";
import { useLocation } from "react-router-dom";

const CreateTodo: React.FC = () => {
  const { state } = useLocation();
  const [resultMessage, setResultMessage] = useState("");
  const [isError, SetIsError] = useState(false);
  const [showNotification, SetShowNotification] = useState(false);
  const [isEditable, setIsEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsEdit(state?.item != null);
  }, []);

  const addTodo = async (todo: TodoItem) => {
    try {
      await AddTodo(todo);
      navigate("/");
    } catch (e) {
      if (e instanceof Error) {
        setResultMessage(e.message);
        SetIsError(true);
        SetShowNotification(true);
      }
    }
  };

  const updateTodo = async (existingTodo: TodoItem) => {
    try {
      await UpdateTodo(existingTodo);
      navigate("/");
    } catch (e) {
      if (e instanceof Error) {
        setResultMessage(e.message);
        SetIsError(true);
        SetShowNotification(true);
      }
    }
  };

  return (
    <Card Title={isEditable ? "Edit Todo's" : "Create Todo's"}>
      {showNotification && (
        <NotificationPanel message={resultMessage} isError={isError} />
      )}
      <Link to="/">
        <MDBBtn className="view-list-btn" size="lg" floating>
          <MDBIcon far icon="list-alt" />
        </MDBBtn>
      </Link>
      <CreateTodoForm
        onAddingTodo={addTodo}
        onUpdateTodo={updateTodo}
        existingTodo={state?.item}
      />
    </Card>
  );
};

export default CreateTodo;
