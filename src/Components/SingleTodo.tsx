import React, { useEffect, useRef, useState } from "react";

import "./Styles.css";
import { Todo } from "../Datas/modals";

import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";

type props = {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo = ({ todo, setTodos, todos, index }: props) => {
  const [Edit, setEdit] = useState<boolean>(false);
  const [EditTodo, setEditTodo] = useState<string>(todo.todo);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [Edit]);

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: EditTodo } : todo))
    );
    setEdit(false);
  };
  return (
    <>
      <Draggable draggableId={todo.id.toString()} index={index}>
        {(provided) => (
          <form
            className="todos__single"
            onSubmit={(e) => handleEdit(e, todo.id)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {Edit ? (
              <input
                aria-label="text"
                ref={inputRef}
                type="text"
                value={EditTodo}
                onChange={(e) => {
                  setEditTodo(e.target.value);
                }}
                className="todos__single--text"
                placeholder="Edit the task..."
              />
            ) : todo.isDone ? (
              <s className="todos__single--text">{todo.todo}</s>
            ) : (
              <span className="todos__single--text">{todo.todo}</span>
            )}

            <div>
              <span
                className="icon"
                onClick={() => {
                  if (!Edit && !todo.isDone) {
                    setEdit(!Edit);
                  }
                }}
                data-tooltip-id="my-tooltip-edit"
              >
                <AiFillEdit />
              </span>
              <span
                className="icon"
                onClick={() => handleDelete(todo.id)}
                data-tooltip-id="my-tooltip-delete"
              >
                <AiFillDelete />
              </span>
              <span
                className="icon"
                onClick={() => handleDone(todo.id)}
                data-tooltip-id="my-tooltip-done"
              >
                <MdDone />
              </span>
            </div>
          </form>
        )}
      </Draggable>
      <ReactTooltip id="my-tooltip-edit" place="bottom" content="Edit" />
      <ReactTooltip id="my-tooltip-delete" place="bottom" content="Delete" />
      <ReactTooltip
        id="my-tooltip-done"
        place="bottom"
        content={`${todo.isDone ? "Undo" : "Done"}`}
      />
    </>
  );
};

export default SingleTodo;
