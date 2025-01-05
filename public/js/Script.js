function createTask(formData) {
  fetch('http://localhost:3000/Posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error creating task');
      }
      return response.json();
    })

    .then((data) => {
      // Handle successful creation of task
      const taskContainer = document.getElementById('taskList');
      const taskItem = document.createElement('li');
      taskItem.classList.add('list-group-item');
      taskItem.innerHTML = `
    <h4>${data.title}</h4>
    <p>Description: ${data.description}</p>
    <p>Status: ${data.status}</p>
    <p>Due Date: ${data.due_date}</p>
`;

      // Append the newly created task to the task list container
      taskContainer.appendChild(taskItem);
    })
    .catch((error) => {
      // Handle errors
      console.error('Error creating task:', error);
    });
}

// Event listener for "Create Task" button
document
  .getElementById('createTaskBtn')
  .addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default form submission
    const formData = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      status: document.getElementById('status').value,
      due_date: document.getElementById('due_date').value,
    };
    createTask(formData); // Call createTask function with form data
  });

function markComplete(taskId) {
  fetch(`http://localhost:3000/Posts/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status: 'completed' }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error marking task as complete');
      }
      console.log('Task marked as complete:', taskId);
      fetchTasks(); // Fetch updated task list
    })
    .catch((error) => {
      console.error('Error marking task as complete:', error);
    });
}

// Function to delete task
function deleteTask(taskId) {
  fetch(`http://localhost:3000/Posts/${taskId}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error deleting task');
      }
      console.log('Task deleted:', taskId);
      fetchTasks(); // Fetch updated task list
    })
    .catch((error) => {
      console.error('Error deleting task:', error);
    });
}

// Function to fetch tasks from backend and display in UI
function fetchTasks() {
  fetch('http://localhost:3000/Posts')
    .then((response) => response.json())
    .then((tasks) => {
      const taskList = document.getElementById('taskList');
      taskList.innerHTML = ''; // Clear previous tasks
      console.log(tasks)

      tasks.forEach((task) => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('list-group-item');
        taskItem.innerHTML = `
                        <h4>${task.title}</h4>
                        <p>Description: ${task.description}</p>
                        <p>Status: ${task.status}</p>
                        <p>Due Date: ${task.due_date}</p>
                        <button type="button" class="btn btn-success mr-2" onclick="markComplete(${task.id})">Mark as Complete</button>
                        <button type="button" class="btn btn-danger" onclick="deleteTask(${task.id})">Delete</button>
                    `;
        taskList.appendChild(taskItem);
      });
    })
    .catch((error) => {
      console.error('Error fetching tasks:', error);
    });
}



// Fetch tasks when the page loads
fetchTasks();
