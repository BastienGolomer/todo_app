// ======================================
function addTaskToList(task) {
  // Create new list item
  var div = document.createElement("div");

  // Apply custom list item class
  div.className = "custom-list-item";

  // add task with button only if the task content is not empty.
  if (task != "") {
    div.innerText = task;
    // Create a button
    var button = document.createElement("button");
    button.innerText = "Task Done";
    button.className = "delete-button";

    // Attach click event listener to button
    button.addEventListener("click", function () {
      // Remove parent div (task) from task list
      div.parentNode.removeChild(div);

      // Update localStorage
      var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      var index = tasks.indexOf(task);
      if (index > -1) {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
    });

    // Append button to div
    div.appendChild(button);

    // Append div to task list
    document.getElementById("taskList").appendChild(div);
  }
}

// ===========================================================
// Function to handle keydown event
window.addEventListener("keydown", function (event) {
  // Check if Ctrl and D keys are pressed
  if (event.altKey && event.key === "j") {
    // Clear task list
    var taskList = document.getElementById("taskList");
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }

    // Update localStorage
    localStorage.removeItem("tasks");
  }
});

// ===========================================================
// Load tasks from localStorage
var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach(function (task) {
  addTaskToList(task);
});

// ===========================================================
// Function to handle form submission
document
  .getElementById("todoForm")
  .addEventListener("submit", function (event) {
    // Prevent form submission
    event.preventDefault();

    // Get input value
    var task = document.getElementById("fname").value;

    // Add task to list
    addTaskToList(task);

    // Update localStorage
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Reset input field
    document.getElementById("fname").value = "";
  });
