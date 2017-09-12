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
