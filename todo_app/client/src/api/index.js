const Api = {

  getTodo(id) {
    console.log("i api");
    return fetch(`/api/todos/${id}`)
      .then(response => response.json())
      // .then(data => console.log(data))
  }

  // updateTodo(newData) {
  //   return fetch('/api/todos', {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application:json'
  //     }
  //     body: JSON.stringify(newData)
  //   })
}

export default Api;
