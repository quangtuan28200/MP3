import React from 'react'
import PropTypes from 'prop-types'
import "../scss/todoList.scss"

function TodoList2(props) {
    const { todos, onTodoClick } = props
    const handleTodoClick = (todo) => {
        if (onTodoClick) {
            onTodoClick(todo)
        }
    }

    return (
        <ul className="todo-list">
            {todos.map(todo => (
                <li
                    key={todo.id}
                    className="todo-item"
                    onClick={() => handleTodoClick(todo)}
                >
                    {todo.title}
                </li>
            ))}
        </ul>
    )
}

TodoList2.propTypes = {
    todos: PropTypes.array,
    onTodoClick: PropTypes.func,
}

TodoList2.defaultProps = {
    todos: [],
    onTodoClick: null,
}

export default TodoList2

