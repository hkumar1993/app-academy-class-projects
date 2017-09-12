import React from 'react';


class TodoListItem extends React.Component {
  constructor(props){
    super(props);
    console.log("list",this.props);

    this.deleteTodo = this.deleteTodo.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
  }

  toggleTodo(e){
    e.preventDefault();
    let todo = this.props.todo;
    todo.done = !todo.done;
    this.props.store.receiveTodo(todo);
  }

  deleteTodo(e){
    e.preventDefault();
    const key = this.props.todo.key;
    this.props.store.removeTodo(this.props.todo);
  }

  render(){
    return (
      <li>
        {this.props.todo.title} <t/>
        <button onClick={this.toggleTodo}>{this.props.todo.done ? "Undo" : "Do"}</button>
        <button onClick={this.deleteTodo}>DELETE</button>
      </li>
    );
  }
}

export default TodoListItem;
