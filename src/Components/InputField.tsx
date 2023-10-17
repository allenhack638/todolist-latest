import "./Styles.css";
import React, { useRef } from "react";

import { Tooltip as ReactTooltip } from "react-tooltip";
interface props {
  Todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  addTodo: (e: React.FormEvent) => void;
}

const InputField = ({ Todo, setTodo, addTodo }: props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <form
        className="input"
        onSubmit={(e) => {
          addTodo(e);
          inputRef.current?.blur();
        }}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter a task"
          className="input__box"
          value={Todo}
          onChange={(e) => setTodo(e.target.value)}
          data-tooltip-id="my-tooltip-input"
        />

        <button className="input_submit" type="submit">
          Go
        </button>
      </form>
      <ReactTooltip
        id="my-tooltip-input"
        place="bottom"
        content="Search bar..."
      />
    </>
  );
};

export default InputField;
