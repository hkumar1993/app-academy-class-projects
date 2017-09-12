import React from 'react';
import TodoListContainer from './todo_list/todo_list_container';


const App = () => (
    <div>
      <h1>Todo App</h1>
      <TodoListContainer />
      
    </div>
  );
// <TodoListContainer store={store}/>

export default App;
