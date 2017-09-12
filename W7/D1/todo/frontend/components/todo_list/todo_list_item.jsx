import React from 'react';


class TodoListItem extends React.Component {
  constructor(props){
    super(props);
    console.log("list",this.props);
  }

  toggleTodo(){

  }

  deleteTodo(){
    const key = this.props.todo.key;
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
