import React from "react";
import { Col } from "react-bootstrap";

const TodoItem = ({ item, deleteItem, toggleComplete }) => {
  return (
    <Col xs={6}>
      <div className={`todo-item ${item.isComplete ? "item-complete" : ""}`}>
        <div className="todo-content">
          <h4>{item.task}</h4>
          <p>by {item.author.name}</p>
        </div>
        <div>
        <button
            className="button-delete"
            onClick={() => deleteItem(item._id)}
          >
            삭제
          </button>
          <button
            className="button-delete"
            onClick={() => toggleComplete(item._id)}
          >
            {item.isComplete ? `안끝남` : `끝남`}
          </button>
        </div>
      </div>
    </Col>
  );
};

export default TodoItem;
