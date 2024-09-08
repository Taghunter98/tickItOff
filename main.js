// User adds name and is directed to Projects page

document.addEventListener('DOMContentLoaded', () => {
    const username = document.getElementById('name-input');
    const startBtn = document.getElementById('start-button');

    // Add user name to projects page
    username.addEventListener('input', () => {
        if (username.value.trim()) {
            startBtn.disabled = false; // removes disabled state
        } else {
            startBtn.disabled = true;
        }
    });

    // Store username and redirect
    startBtn.addEventListener('click', () => {
        const userName = username.value.trim();
        if (username) {
            localStorage.setItem('username', userName); // saves name to local storage
            window.location.href = 'projects.html'; // redirects user to projects page
        }
    });

});


// Show username
const userName = localStorage.getItem('username'); // gets username
const greeting = document.getElementById('greeting'); // greeting h1 element

greeting.textContent = 'Hi, ' + userName;





// Create a new project
document.addEventListener('DOMContentLoaded', () => {
    
    const newProjectInput = document.getElementById('new-project-input');
    const addProjectBtn = document.getElementById('add-project-btn');
    const projectList = document.getElementById('project-list');
    const projectTitle = document.getElementById('project-title');
    const taskList = document.getElementById('task-list');
    const newTaskInput = document.getElementById('new-task-input');
    const addTaskBtn = document.getElementById('add-task-btn');

    // Retrieve from local storage
    let projects = JSON.parse(localStorage.getItem('projects')) || {};
    let currentProject = localStorage.getItem('currentProject'); // Track the current project
    
    // Save from local storage
    function saveProjects() {
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    // Function to render the list of projects
    function renderProjects() {
        projectList.innerHTML = '';
        Object.keys(projects).forEach(projectName => {
            const li = document.createElement('li');
            li.textContent = projectName;

            // Add click event to select the project
            li.addEventListener('click', () => {
                selectProject(projectName);
            });

            projectList.appendChild(li);
        });
    }

    // Select Project
    function selectProject(projectName) {
        currentProject = projectName;
        localStorage.setItem('currentProject', currentProject);
        renderTasks();
    }

    // Function to render tasks
    function renderTasks() {
        if (!currentProject) return; // If no project is selected, do nothing
        projectTitle.textContent = currentProject; // Display the selected project title
        taskList.innerHTML = '';

        projects[currentProject].forEach(task => {
            const li = document.createElement('li');
            li.textContent = task;
            taskList.appendChild(li);
        });
    }

    // Add a new task to the current Project
    addTaskBtn.addEventListener('click', () => {
        const taskName = newTaskInput.value.trim(); // Get task input
        if (taskName && currentProject) {
            projects[currentProject].push(taskName); // Add the task to the current project
            saveProjects(); // Save updated projects to local storage
            renderTasks(); // Re-render the tasks to include the new one
            newTaskInput.value = ''; // Clear the task input field
        }
    })
    

    // Add event listener to the "Add" button
    addProjectBtn.addEventListener('click', () => {
        const projectName = newProjectInput.value.trim(); // Trims extra space
        if (projectName && !projects[projectName]) { // Ensure the project name is not empty and doesn't already exist
            projects[projectName] = [];
            saveProjects();
            renderProjects();
            newProjectInput.value = '';
        }
    });

    renderProjects();

    if (currentProject) {
        selectProject(currentProject); // Render the tasks of the currently selected project
    }
    
});








