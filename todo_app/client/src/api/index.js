import axios from 'axios';

export function getTodo(id) {
  console.log('i api');
  return fetch(`/api/todos/${id}`)
    .then(response => response.json());
}

export function updateTodo(id, newData) {
  return axios({
    method: 'PATCH',
    url: `/api/todos/${id}`,
    data: { editor_data: JSON.stringify(newData) },
  });
}
