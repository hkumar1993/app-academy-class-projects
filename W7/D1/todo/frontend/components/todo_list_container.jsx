import React from 'react';
import { connect } from 'react-redux';
import TodoList from './todo_list';
import {allTodos} from '../reducers/selectors';
import {receiveTodo, receiveTodos} from '../actions/todo_actions';

const mapStateToProps = state => ({
  todos: allTodos(state),
  state
});

const mapDispatchToProps = dispatch => ({
  receiveTodos: () => dispatch(receiveTodos()),
  receiveTodo: todo => dispatch(receiveTodo(todo))
});

console.log(mapStateToProps);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
