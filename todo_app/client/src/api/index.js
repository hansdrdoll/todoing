export function getTodo(id) {
  console.log('i api');
  return fetch(`/api/todos/${id}`)
    .then(response => response.json());
}

export function updateTodo(id, newData) {
  return fetch(`/api/todos/${id}`, {
    method: 'PATCH',
    headers: { 'content-type': 'application:json' },
    body: { data: JSON.stringify(newData) },
  });
}
