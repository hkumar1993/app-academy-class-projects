import React from 'react';
import TodoListItem from './todo_list_item';

class TodoList extends React.Component {
  constructor(props){
    super(props);
    console.log("PROPS", this.props);

  }

  render(){
    console.log(this.props);
    return (
      <ul>
        {this.props.todos.map((el) => <TodoListItem todo={el} key={`list_${el.id}`} />)}
      </ul>
    );
  }
}

export default TodoList;
