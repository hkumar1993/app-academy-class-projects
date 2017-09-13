import React from 'react';


class TodoListItem extends React.Component {
  constructor(props){
    super(props);
    console.log("list",this.props);
    this.state = {loading: false};
    this.deleteTodo = this.deleteTodo.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
    this.loading = this.loading.bind(this);
  }

  toggleTodo(e){
    e.preventDefault();
    this.setState({loading: true});
    let todo = this.props.todo;
    console.log("Before", todo);
    todo.done = !todo.done;
    // this.props.store.receiveTodo(todo);
    //
    this.props.updateTodo( todo ).then(() => {
      debugger;
      this.setState({loading: false});
    });
    console.log("After", todo);
  }

  deleteTodo(e){
    e.preventDefault();
    this.setState({loading: true});
    // const key = this.props.todo.key;
    // this.props.store.removeTodo(this.props.todo);
    console.log("Delet button todo:", this.props.todo);
    this.props.deleteTodo(this.props.todo);
  }

  loading(){
    return this.state.loading;
  }



  render(){
    return (
      <li>
        {this.props.todo.title} <t/>
      <button disabled={this.loading()} onClick={this.toggleTodo}>{this.props.todo.done ? "Undo" : "Do"}</button>
        <button disabled={this.loading()}  onClick={this.deleteTodo}>DELETE</button>
      </li>
    );
  }
}

export default TodoListItem;
