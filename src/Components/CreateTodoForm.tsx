import React, { useState, useEffect } from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PRIORITIES } from "../Constants";
import moment from "moment";

import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBTooltip,
  MDBBtn,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";

const CreateTodoForm: React.FC<TodoFormProps> = ({
  onAddingTodo,
  onUpdateTodo,
  existingTodo,
}) => {
  let emptyTodo: TodoItem = {
    Done: false,
    Due: new Date(),
    id: "",
    Name: "",
    priority: "",
    Text: "",
  };

  const [currentTodo, setCurrentTodo] = useState<TodoItem>(emptyTodo);

  useEffect(() => {
    setCurrentTodo(existingTodo);
  }, []);

  const FormSchema = z.object({
    name: z.string().min(2),
    text: z.string().min(2),
    date: z.string().min(10, "Enter a valid date"),
    priority: z
      .string()
      .refine(
        (val) => PRIORITIES.includes(val),
        "Priority must be either High , Medium or Low"
      ),
  });

  type FormSchemaType = z.infer<typeof FormSchema>;

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: existingTodo?.Name,
      text: existingTodo?.Text,
      date: moment(existingTodo?.Due).format("yyyy-MM-DD"),
      priority: existingTodo?.priority,
    },
  });

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    //new todo
    let todo: TodoItem = {
      id: currentTodo !== undefined ? currentTodo.id : crypto.randomUUID(),
      Name: data.name,
      Text: data.text,
      Done: false,
      Due: new Date(data.date),
      priority: data.priority,
    };

    currentTodo !== undefined ? onUpdateTodo(todo) : onAddingTodo(todo);
  };

  return (
    <MDBCard>
      <MDBCardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <MDBRow className="mb-4">
            <MDBCol>
              <MDBInput
                label="Name"
                {...register("name")}
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="text-error">{errors.name.message}</p>
              )}
            </MDBCol>
            <MDBCol>
              <div>
                <MDBTooltip
                  tag="a"
                  wrapperProps={{ href: "#" }}
                  title="Set Due Date"
                >
                  <input
                    className="form-control date-input"
                    type="date"
                    {...register("date")}
                    disabled={isSubmitting}
                  />
                  {errors.date && (
                    <p className="text-error">{errors.date?.message}</p>
                  )}
                </MDBTooltip>
              </div>
            </MDBCol>
          </MDBRow>
          <MDBCol>
            <MDBInput
              className="mb-4"
              type="text"
              label="Enter Task Description"
              {...register("text")}
              disabled={isSubmitting}
            />
            {errors.text && <p className="text-error">{errors.text.message}</p>}
          </MDBCol>
          <MDBRow className="mb-4">
            <MDBCol size="auto">
              <label style={{ marginRight: "15px" }}>Priority:</label>
            </MDBCol>
            <MDBCol size="auto">
              <select
                id="start"
                {...register("priority")}
                disabled={isSubmitting}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
                <option value="no">None</option>
              </select>
            </MDBCol>
            {errors.priority && (
              <p className="text-error">{errors.priority?.message}</p>
            )}
          </MDBRow>

          {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}

          <MDBBtn type="submit" className="mb-4" block>
            {currentTodo !== undefined ? "Edit Task" : "Add Task"}
          </MDBBtn>
        </form>
      </MDBCardBody>
    </MDBCard>
  );
};

export default CreateTodoForm;
