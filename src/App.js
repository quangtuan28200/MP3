import React, { useEffect, useCallback, useState } from "react";
import TodoList from "./components/TodoList";
import Textfield from "@atlaskit/textfield";
import Button from '@atlaskit/button'
import { v4 } from 'uuid';

const TODO_APP_STORAGE_KEY = "TODO_APP";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [textInput, setTextInput] = useState();

  useEffect(() => {
    const storageTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if (storageTodoList) {
      setTodoList(JSON.parse(storageTodoList));
    }
  }, [])

  useEffect(() => {
    console.log(todoList)
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList])

  const onTextInputChange = useCallback(
    (e) => {
      setTextInput(e.target.value);
    },
    [],
  );

  const onAddBtnClick = useCallback(
    () => {
      setTodoList([{ id: v4(), name: textInput, isCompleted: false }, ...todoList])
      setTextInput("");
    },
    [textInput, todoList],
  );

  const onCheckBtnClick = useCallback(
    (id) => {
      setTodoList((prevState) => prevState.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true } : todo
      ));
    },
    [],
  )

  console.log(textInput)
  console.log(todoList)

  return (
    <>
      <h3>Danh sach can lam</h3>
      <Textfield
        name="add-todo"
        placeholder="Them viec can lam"
        elemAfterInput={
          <Button isDisabled={!textInput} appearance="primary" onClick={onAddBtnClick}>THEM</Button>
        }
        css={{ padding: "2px 4px 2px" }}
        value={textInput}
        onChange={onTextInputChange}
      ></Textfield>
      <TodoList todoList={todoList} onCheckBtnClick={onCheckBtnClick} />
    </>
  );
}

export default App;
