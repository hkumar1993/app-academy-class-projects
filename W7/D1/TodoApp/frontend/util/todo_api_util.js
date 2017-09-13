export function requestTodos() {
  return (
    $.ajax({
      method: 'GET',
      url: '/api/todos'
    })
  );
}


export function newTodo(todo) {
  const data = { todo: {
    title: todo.title,
    body: todo.body
  }};
  console.log("TODO", todo);
  return (
    $.ajax({
      method: 'POST',
      url: '/api/todos',
      data
    })
  );
}

export function upTodo(todo) {
  const data = {
    todo: {
      title: todo.title,
      body: todo.body,
      done: todo.done
    }
  };
  return (
    $.ajax({
      method: 'PATCH',
      url: `/api/todos/${todo.id}`,
      data
    })
  );
}

export function delTodo(todo) {
  return (
    $.ajax({
      method: 'DELETE',
      url: `/api/todos/${todo.id}`,
    })
  );
}
