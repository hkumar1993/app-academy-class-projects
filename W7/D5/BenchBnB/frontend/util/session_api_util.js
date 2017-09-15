export const postUser = (user) => {
  return $.ajax({
    url: 'api/users',
    method: 'POST',
    data: { user }
  })
}

export const postSession = (user) => {
  console.log('User in postSession', user);
  return $.ajax({
    url: 'api/session',
    method: 'POST',
    data: { user }
  })
}

export const deleteSession = () => {
  return $.ajax({
    url: 'api/session',
    method: 'DELETE'
  })
}
