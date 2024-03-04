document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const congratsMessage = document.getElementById('congratsMessage');
    const suggestionsList = document.getElementById('suggestionsList');
    const durationInput = document.getElementById('durationInput');
    const duration = document.getElementById('duration');
    const audio = document.getElementById('audio');
    const previousTasksList = document.getElementById('previousTasksList'); // Add reference to the previous tasks list

    addTaskBtn.addEventListener('click', addTask);
    suggestionsList.addEventListener('click', handleSuggestionClick);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const li = document.createElement('li');
            const taskSpan = document.createElement('span');
            taskSpan.textContent = taskText;

            // Add duration for every task
            const taskDuration = prompt(`Enter duration for "${taskText}" task (in minutes):`);
            if (taskDuration === null || taskDuration.trim() === '' || isNaN(taskDuration) || parseInt(taskDuration) <= 0) {
                alert('Please enter a valid duration for the task.');
                return;
            }

            const durationSpan = document.createElement('span');
            durationSpan.textContent = ` (${taskDuration} minutes)`;
            
            // Create a button for task completion
            const completeButton = document.createElement('button');
            completeButton.textContent = 'Complete';
            completeButton.addEventListener('click', function() {
                // Toggle the completion status
                li.classList.toggle('completed');
                // Display congratulatory message
                congratsMessage.textContent = 'Congratulations for completing the task!';
                congratsMessage.style.display = 'block';
                audio.play(); // Play the audio

                // Hide message after 3 seconds
                setTimeout(function() {
                    congratsMessage.style.display = 'none';
                }, 3000);
            });

            li.appendChild(taskSpan);
            li.appendChild(durationSpan);
            li.appendChild(completeButton); // Append the complete button
            taskList.appendChild(li);
            taskInput.value = '';

            // Add task to previous tasks list
            const currentTime = new Date();
            const previousTaskTime = new Date(currentTime.getTime() - 60 * 60 * 1000); // 60 minutes ago
            if (taskDuration > 0 && new Date(taskDuration) > previousTaskTime) {
                const previousTaskLi = document.createElement('li');
                previousTaskLi.textContent = `${taskText} (${taskDuration} minutes)`;
                previousTasksList.appendChild(previousTaskLi);
            }

            // Display congratulatory message
            congratsMessage.textContent = 'Congratulations for creating a new task!';
            congratsMessage.style.display = 'block';
            audio.play(); // Play the audio

            // Hide message after 3 seconds
            setTimeout(function() {
                congratsMessage.style.display = 'none';
            }, 3000);

            // Schedule timer for the task
            scheduleTaskTimer(taskText, parseInt(taskDuration));
        } else {
            alert('Please enter a task!');
        }
    }

    function handleSuggestionClick(event) {
        const task = event.target.textContent; // Get the text content of the clicked suggestion button
        taskInput.value = task; // Fill the task input field with the clicked suggestion
        durationInput.style.display = 'none'; // Hide duration input for suggestions
    }

    function scheduleTaskTimer(task, duration) {
        const timeToExecute = new Date(Date.now() + duration * 60000); // Convert minutes to milliseconds

        // Set up timer
        const taskTimer = setInterval(function() {
            const timeRemaining = Math.ceil((timeToExecute - Date.now()) / 1000);
            if (timeRemaining <= 0) {
                clearInterval(taskTimer);
                alert(`Time to complete "${task}" task is up!`);
            } else if (timeRemaining <= 60) { // Alert the user when 1 minute is left
                alert(`Get ready to complete "${task}" task in 1 minute!`);
            }
        }, 1000);
    }

    // Update time and date
    function updateTimeAndDate() {
        const now = new Date();
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
        const date = now.toLocaleDateString('en-US', dateOptions);
        const time = now.toLocaleTimeString('en-US', timeOptions);
        datetime.textContent = `${date} - ${time}`;
    }

    updateTimeAndDate();
    setInterval(updateTimeAndDate, 1000);
});
