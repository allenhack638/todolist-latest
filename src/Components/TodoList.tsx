import React from "react";
import "./Styles.css";
import { Todo } from "../Datas/modals";
import SingleTodo from "./SingleTodo";

import { Droppable } from "react-beautiful-dnd";
import { MdPending } from "react-icons/md";
import { TiTickOutline } from "react-icons/ti";
import { Tooltip as ReactTooltip } from "react-tooltip";

interface props {
  Todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  CompletedTodos: Todo[];
}

const TodoList = ({
  Todos,
  setTodos,
  setCompletedTodos,
  CompletedTodos,
}: props) => {
  return (
    <>
      <div className="container">
        <Droppable droppableId={"TodosList"}>
          {(provided, snapshot) => (
            <div
              className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="todos__heading">
                Active Tasks <MdPending data-tooltip-id="my-tooltip-pending" />
              </span>
              {Todos?.map((todo, index) => (
                <SingleTodo
                  index={index}
                  todo={todo}
                  setTodos={setTodos}
                  key={todo.id}
                  todos={Todos}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Droppable droppableId={"RemoveTodoList"}>
          {(provided, snapshot) => (
            <div
              className={`todos ${
                snapshot.isDraggingOver ? "dragcomplete" : "remove"
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="todos__heading">
                Completed Tasks{" "}
                <TiTickOutline data-tooltip-id="my-tooltip-completed" />
              </span>
              {CompletedTodos?.map((todo, index) => (
                <SingleTodo
                  index={index}
                  todo={todo}
                  setTodos={setCompletedTodos}
                  key={todo.id}
                  todos={CompletedTodos}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
      <ReactTooltip
        id="my-tooltip-pending"
        place="bottom"
        content="Active Tasks"
      />{" "}
      <ReactTooltip
        id="my-tooltip-completed"
        place="bottom"
        content="Completed Tasks"
      />
    </>
  );
};

export default TodoList;
