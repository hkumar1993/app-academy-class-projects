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
          {this.props.todos.map((el) => <TodoListItem todo={el} key={`list_${el.id}`} store={this.props} />)}
        </ul>
        <TodoForm props={this.props}/>
      </div>
    );
  }
}

export default TodoList;
