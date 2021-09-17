import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react/cjs/react.development'
import "../scss/todoform.scss"
import { v4 } from 'uuid';


function TodoForm(props) {
    const [formValue, setformValue] = useState('')
    const { getTodoItem } = props

    function onTodoFormChange(e) {
        const value = e.target.value
        console.log(value);
        setformValue(value)
    }

    function onSubmitTodoForm(e) {
        e.preventDefault()

        if (getTodoItem) {
            const todoItem = { id: v4(), title: formValue }
            getTodoItem(todoItem)
        }
        setformValue("")
    }

    return (
        <div>
            <h3>TODO LIST</h3>
            <form className="todo-form" onSubmit={(e) => onSubmitTodoForm(e)}>
                <input
                    type="text"
                    value={formValue}
                    onChange={(e) => onTodoFormChange(e)}
                    placeholder="Viec can lam"
                />
            </form>
        </div>
    )
}

TodoForm.propTypes = {
    getTodoItem: PropTypes.func,
}

TodoForm.defaultProps = {
    getTodoItem: null,
}

export default TodoForm

