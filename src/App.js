import React, { useEffect, useCallback, useState } from "react";
import TodoList from "./components/TodoList";
import ColorBox from "./components/ColorBox";
import Textfield from "@atlaskit/textfield";
import Button from '@atlaskit/button'
import { v4 } from 'uuid';
import TodoList2 from "./components/TodoList2";
import TodoForm from "./components/TodoForm";
import PostList from "./components/PostList";

const TODO_APP_STORAGE_KEY = "TODO_APP";

function App() {

  //-----------------------------------------------------POST_LIST----------------//

  const [postList, setpostList] = useState([])

  useEffect(() => {
    async function fetchPostList() {
      try {
        const URL = 'http://js-post-api.herokuapp.com/api/posts?_limit=10&_page=1'
        const response = await fetch(URL)
        const responseJSON = await response.json();

        const { data } = responseJSON
        setpostList(data)
      } catch (error) {
        alert("failed to load data: ", error.message)
      }

    }

    fetchPostList()
  }, [])

  //-----------------------------------------------------TODO_LIST_2----------------//

  const [todoList2, setTodoList2] = useState([
    { id: 1, title: 'I love Easy Frontend! 😍' },
    { id: 2, title: 'We love Easy Frontend! 🥰' },
    { id: 3, title: 'They love Easy Frontend! 🚀' },
  ])

  function handleTodoClick(todo) {
    const index = todoList2.findIndex(x => x.id === todo.id);
    if (index < 0) return;

    const newTodoList = [...todoList2];
    newTodoList.splice(index, 1);
    setTodoList2(newTodoList);
    console.log(todoList2)
  }

  function getTodoItem(todoItem) {
    console.log(todoItem)

    const newTodoList = [todoItem, ...todoList2]
    // newTodoList.push(todoItem)
    setTodoList2(newTodoList)
  }

  //-----------------------------------------------------TODO_LIST----------------//

  const [todoList, setTodoList] = useState([]);
  const [textInput, setTextInput] = useState();

  useEffect(() => {
    const storageTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if (storageTodoList) {
      setTodoList(JSON.parse(storageTodoList));
    }
  }, [])

  useEffect(() => {
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

  return (
    <>
      {/* TODO_LIST */}
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

      {/* COLOR_BOX */}
      <ColorBox />

      {/* TODO_LIST_2 */}
      <TodoForm getTodoItem={getTodoItem} />
      <TodoList2 todos={todoList2} onTodoClick={handleTodoClick} />

      {/* POST_LIST */}
      <PostList posts={postList} />
    </>
  );
}

export default App;
