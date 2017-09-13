import React from 'react';
import { connect } from 'react-redux';
import TodoList from './todo_list';
import {allTodos} from '../../reducers/selectors';
import {createTodo, receiveTodos, removeTodo, updateTodo, deleteTodo} from '../../actions/todo_actions';
import {receiveErrors} from '../../actions/error_actions';

const mapStateToProps = state => ({
  todos: allTodos(state),
  state
});

const mapDispatchToProps = dispatch => ({
  receiveTodos: () => dispatch(receiveTodos()),
  createTodo: todo => dispatch(createTodo(todo)),
  updateTodo: todo => dispatch(updateTodo(todo)),
  deleteTodo: todo => dispatch(deleteTodo(todo)),
  receiveErrors: errors => dispatch(receiveErrors(errors)),
});

console.log(mapStateToProps);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
