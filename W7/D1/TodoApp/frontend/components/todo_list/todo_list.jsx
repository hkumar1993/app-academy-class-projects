import React from 'react';
import TodoListItem from './todo_list_item';
import TodoForm from './todo_form';
class TodoList extends React.Component {
  constructor(props){
    super(props);
    console.log("PROPS", this.props);

  }

  render(){
    return (
      <div>
        <ul>
          {this.props.todos.map((el) => <TodoListItem todo={el} key={`list_${el.id}`} store={this.props} updateTodo={this.props.updateTodo} deleteTodo={this.props.deleteTodo}/>)}
        </ul>
        <TodoForm createTodo={this.props.createTodo} />
      </div>
    );
  }
}

export default TodoList;
