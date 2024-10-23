import React from "react";
import { Row } from "react-bootstrap";

import TodoItem from "./TodoItem";

const TodoBoard = ({ todoList, deleteItem, toggleComplete }) => {
  return (
    <div>
      <h2>Todo List</h2>
      <Row>
        {todoList.length > 0 &&
          todoList.map((item, index) => (
            <TodoItem
              item={item}
              key={index}
              deleteItem={deleteItem}
              toggleComplete={toggleComplete}
            />
          ))}
      </Row>
    </div>
  );
};

export default TodoBoard;
