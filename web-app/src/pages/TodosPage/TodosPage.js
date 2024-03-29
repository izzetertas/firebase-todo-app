import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import { TodoList } from '@izzetertas/lib-todo'
import Title from 'components/Title'

import { useDispatch, useSelector } from 'react-redux'

import {
  getTodosRequest,
  addTodoRequest,
  removeTodoRequest,
  updateTodoRequest
} from './actions'

import messages from './messages'

const TodosPage = () => {
  const dispatch = useDispatch()
	const { firstName, lastName } = useSelector((state) => state.user.userDetail)
	const { items, itemsLoading, addTodoInProgress } = useSelector((state) => state.todos)

	useEffect(() => {
    dispatch(getTodosRequest())
  }, [])
  
  const handleChange = ({ action, id, done, text }) => {
    switch (action) {
      case 'ADD':
        dispatch(addTodoRequest(text, done))
        break
      case 'DELETE':
        dispatch(removeTodoRequest(id))
        break
      case 'UPDATE':
        dispatch(updateTodoRequest({ id, done, text }))
        break
    }
  }

	return (
		<div>
			<Title>
        <FormattedMessage {...messages.header} values={{ firstName, lastName }} />
      </Title>
			<div>
				<TodoList
          items={items}
          itemsLoading={itemsLoading}
          onChange={handleChange}
          addTodoInProgress={addTodoInProgress}
        />
			</div>
		</div>
	)
}

export default TodosPage
