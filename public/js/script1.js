<script src="js/script1.js">


function createTask(formData) {
    fetch('http://localhost:3000/Posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error creating task');
        }
        return response.json();
    })
    .then(data => {
        // Handle successful creation of task
        console.log('Task created:', data);
        // You can update the UI to display the newly created task if needed
    })
    .catch(error => {
        // Handle errors
        console.error('Error creating task:', error);
    })
}


// Function to fetch all tasks
function fetchTasks() {
    fetch('http://localhost:3000/posts')
    .then(response => response.json())
    .then(data => {
        // Handle successful retrieval of tasks
        console.log('Tasks:', data);
        // You can update the UI to display the list of tasks if needed
    })
    .catch(error => {
        // Handle errors
        console.error('Error fetching tasks:', error);
    })
}

// Function to update a task
function updateTask(taskId, formData) {
    fetch(`http://localhost:3000/posts/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        // Handle successful update of task
        console.log('Task updated:', data);
        // You can update the UI to reflect the changes if needed
    })
    .catch(error => {
        // Handle errors
        console.error('Error updating task:', error);
    })
}

// Function to delete a task
function deleteTask(taskId) {
    fetch(`http://localhost:3000/posts/${taskId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        // Handle successful deletion of task
        console.log('Task deleted:', data);
        // You can update the UI to reflect the changes if needed
    })
    .catch(error => {
        // Handle errors
        console.error('Error deleting task:', error);
    })
}

// Example usage:
// You can call these functions based on user interactions in your UI
// For example, when a user submits a form to create a new task, call the createTask function with the form data
// Similarly, when a user clicks on a button to delete a task, call the deleteTask function with the task ID
// You can also call fetchTasks function to retrieve all tasks and display them in the UI

</script>
