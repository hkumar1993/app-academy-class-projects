import React from 'react';
import {receiveTodo} from '../../actions/todo_actions';
import { allTodos } from '../../reducers/selectors';
import uniqueId from '../../util/unique_id';

class TodoForm extends React.Component {
  constructor(props){
    super();
    const id = uniqueId();
    this.updateTitle = this.updateTitle.bind(this);
    this.updateBody = this.updateBody.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // console.log('props', props.props.receiveTodo);
    this.state = {id, title: '', body: ''};
  }

  handleSubmit(e){
    e.preventDefault();
    console.log(this.props.props.receiveTodo(this.state));
    this.state = {
      id: uniqueId(),
      title: '',
      body: ''
    };
  }

  updateTitle(e){
    const title = e.currentTarget.value;
    this.setState({title});
  }

  updateBody(e){
    const body = e.currentTarget.value;
    this.setState({body});
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <label> Title
          <input type="text" name="todo[title]" onChange={this.updateTitle} value={this.state.title}/>
        </label><br/>
        <label> Body
          <textarea name="todo[body]" onChange={this.updateBody} value={this.state.body}></textarea>
        </label><br/>
        <input type="submit" value="Create Todo" />
      </form>
    );
  }

}

export default TodoForm;
