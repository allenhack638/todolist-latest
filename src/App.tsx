import "./App.css";
import { useState } from "react";

import InputField from "./Components/InputField";
import TodoList from "./Components/TodoList";
import { Todo } from "./Datas/modals";

import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { FcTodoList } from "react-icons/fc";
import { Tooltip as ReactTooltip } from "react-tooltip";

function App(): JSX.Element {
  const [Todo, setTodo] = useState<string>("");
  const [Todos, setTodos] = useState<Todo[]>([]);
  const [CompletedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();

    if (Todo.trim() !== "") {
      setTodos([...Todos, { id: Date.now(), todo: Todo, isDone: false }]);
      setTodo("");
    }
  };
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = Todos;
    let complete = CompletedTodos;
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="App">
          <span className="heading" data-tooltip-id="my-tooltip-1">
            TODO LIST <FcTodoList />
          </span>

          <InputField Todo={Todo} setTodo={setTodo} addTodo={addTodo} />
          <TodoList
            Todos={Todos}
            setTodos={setTodos}
            CompletedTodos={CompletedTodos}
            setCompletedTodos={setCompletedTodos}
          />
        </div>
      </DragDropContext>

      <ReactTooltip id="my-tooltip-1" place="bottom" content="TODO LIST APP" />
    </>
  );
}

export default App;
