"use strict"

// Registers the dialog box polyfill
let dialog = document.getElementById("addDialog");
let dialog2 = document.getElementById("showDialog");
if (!dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
}

if (!dialog2.showModal) {
    dialogPolyfill.registerDialog(dialog2);
}

// Open the dialog box when save button being clicked
function createTask() {
    let out = "";
    out += `<h6 class="mdl-dialog__title">Create a task...</h6>
    <div class="mdl-dialog__content">
    <div class="mdl-grid">
    <!-- begin inputs -->
    
    <div class="mdl-cell mdl-cell--12-col mdl-cell--8-col-desktop">
    <div
    class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
    <input class="mdl-textfield__input" type="text" id="new_name">
    <label class="mdl-textfield__label" for="new_name">Title of task:</label>
    </div><br>
    <div
    class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
    <input class="mdl-textfield__input" type="text" id="new_desc">
    <label class="mdl-textfield__label" for="new_desc">Description:</label>
    </div><br>
    
    <div
    class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
    <input class="mdl-textfield__input" type="text" id="new_assignee">
    <label class="mdl-textfield__label" for="new_assignee">Who is assigned:</label>
    </div><br>
    
    <div>
    <label for="TypeOfTask">Type of Task</label><br>
    <select name="TypeOfTask" id="TypeOfTask">
    <option value="null" disabled selected>Choose type of task</option>
    <option value="frontend">Front-End</option>
    <option value="backend">Back-End</option>
    <option value="design">Design</option>
    </select>
    </div>
    <br>
    
    <div>
    <label for="Difficulty">Difficulty</label><br>
    <select name="Difficulty" id="Difficulty">
    <option value="null" disabled selected>Difficulty of task</option>
    <option value="easy">easy</option>
    <option value="medium">medium</option>
    <option value="quite hard">quite hard</option>
    <option value="very hard">very hard</option>
    </select>
    </div>
    <br>
    
    <div>
    <label for="Priority">Priority</label><br>
    <select name="Priority" id="Priority">
    <option value="null" disabled selected>Priority of task</option>
    <option value="very urgent">very urgent</option>
    <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
    </select>
    </div>
    <br>
    
    <div>
    <label for="StateOfTask">State of Task</label><br>
    <select name="StateOfTask" id="StateOfTask">
    <option value="null" disabled selected>Choose state of task</option>
    <option value="Pending">Pending</option>
    <option value="In Progress">In Progress</option>
    <option value="Completed">Completed</option>
    </select>
    </div>
    <br>
    
    
    
    </div>
    <!-- end inputs -->
    </div>
    </div>
    <div class="mdl-dialog__actions">
    <!-- begin dialog actions -->
    <button type="button" class="mdl-button close" onclick="cancelCreatedTask()" id="dialogCancel">Cancel</button>
    <button type="button" class="mdl-button" onclick="saveTask()">Confirm</button>
    <!-- end dialog actions -->
    
    </div>
    <!-- end inputs -->`;
    document.getElementById("addDialog").innerHTML = out;
    dialog.showModal();
}


/**
* @function cancelCreatedTask
* cancel vacation plan inside dialog box
*/
function cancelCreatedTask() {
    // Alert message when user click on cancel
    let confirmAction = confirm("Keep Editting?");
    if (confirmAction) {
        void(0);
    }
    else {
        //direct to home
        dialog.close();
    }
}

/**
* @function saveTask
* cancel vacation plan inside dialog box
*/
function saveTask() {
    let name = document.getElementById("new_name").value;
    let desc = document.getElementById("new_desc").value;
    let assignee = document.getElementById("new_assignee").value;
    let type = document.getElementById("TypeOfTask").value;
    let diff = document.getElementById("Difficulty").value;
    let prio = document.getElementById("Priority").value;
    let state = document.getElementById("StateOfTask").value;
    let task = new Task(productlog._tasks.length + 1, name, desc, assignee, type, diff, prio, state);
    productlog.addTask(task);
    ls.setItem(`productlog`, JSON.stringify(productlog));
    dialog.close();
    displayTask();
}

/**
* @function displayTask
* display task 
*/
function displayTask() {
    let out = "";
    let productlog = ls.getItem(`productlog`);
    let productlogtask = JSON.parse(productlog);
    if (ls.length <= 0 || productlogtask._tasks.length <= 0){
        out += `<p>Your product backlog is empty. Start by creating a task!</p>`
    }
    else {
        for (let i = 0; i < productlogtask._tasks.length; i++){
            let task = productlogtask._tasks[i];
            if (task != null){
                out += `
                <div class="card1 mdl-card mdl-shadow--2dp" id="task${task._id}">
                    <button id="button${task._id}" class="mdl-button mdl-js-button mdl-button--icon">
                        <i class="material-icons">more_vert</i>
                    </button>
                    <ul class="mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect" for="button${task._id}">
                        <li class="mdl-menu__item">Add Task To Sprint</li>
                        <li class="mdl-menu__item">Copy Task</li>
                        <li class="mdl-menu__item" onclick="deleteTask(${task._id})">Delete Task</li>
                    </ul>

                    <div class="mdl-card__title mdl-card--expand">
                        <h2 class="mdl-card__title-text">${task._name}</h2>
                    </div>
                    <div class="mdl-card__actions mdl-card--border">
                        <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onclick="viewDetails(${task._id})"> More Details </a>
                    </div>
                </div>`;
            }
            
        }
    }
    document.getElementById("displayCard").innerHTML = out;
    componentHandler.upgradeDom();
}

function viewDetails(i){
    let out = "";
    out += `<div class="mdl-cell mdl-cell--12-col mdl-cell--8-col-desktop">
    <div
    class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
    <label class="mdl-textfield__label" for="new_name">Title of task:</label>
    <p id="taskname"></p>
    </div><br>
    <div
    class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
    <label class="mdl-textfield__label" for="new_desc">Description:</label>
    <p id="taskdesc"></p>
    </div><br>
    
    <div
    class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
    <label class="mdl-textfield__label" for="new_assignee">Who is assigned:</label>
    <p id="taskassignee"></p>
    </div><br>
    
    <div>
    <label for="TypeOfTask">Type of Task</label><br>
    <p id="tasktype"></p>
    </div>
    <br>
    
    <div>
    <label for="Difficulty">Difficulty</label><br>
    <p id="taskdiff"></p>
    </div>
    <br>
    
    <div>
    <label for="Priority">Priority</label><br>
    <p id="taskprio"></p>
    </div>
    <br>
    
    <div>
    <label for="StateOfTask">State of Task</label><br>
    <p id="taskstate"></p>
    </div>
    <br>
    
    <!-- Raised button with ripple -->
    <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onclick = "editDetails(${i})">
    Edit Details
    </button>
    <!-- Raised button with ripple -->
    <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onclick = "closeDialog()">
    Done
    </button>
    
    </div>`;
    document.getElementById("showDialog").innerHTML = out;
    
    let productlog = ls.getItem(`productlog`);
    let productlogtask = JSON.parse(productlog);
    let parse = productlogtask._tasks[i-1]
    let name = parse._name;
    let desc = parse._desc;
    let assingee = parse._assignee;
    let type = parse._type;
    let diff = parse._diff;
    let prio = parse._prio;
    let state = parse._state;
    document.getElementById("taskname").innerHTML = name;
    document.getElementById("taskdesc").innerHTML = desc;
    document.getElementById("taskassignee").innerHTML = assingee;
    document.getElementById("tasktype").innerHTML = type;
    document.getElementById("taskdiff").innerHTML = diff;
    document.getElementById("taskprio").innerHTML = prio;
    document.getElementById("taskstate").innerHTML = state;
    dialog2.showModal();
}

function editDetails(i){
    dialog2.close();
    let out = "";
    out += `<div class="mdl-cell mdl-cell--12-col mdl-cell--8-col-desktop">
    <div
    class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
    <input class="mdl-textfield__input" type="text" id="new_name">
    <label class="mdl-textfield__label" for="new_name">Title of task:</label>
    </div><br>
    <div
    class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
    <input class="mdl-textfield__input" type="text" id="new_desc">
    <label class="mdl-textfield__label" for="new_desc">Description:</label>
    </div><br>
    
    <div
    class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
    <input class="mdl-textfield__input" type="text" id="new_assignee">
    <label class="mdl-textfield__label" for="new_assignee">Who is assigned:</label>
    </div><br>
    
    <div>
    <label for="TypeOfTask">Type of Task</label><br>
    <select name="TypeOfTask" id="TypeOfTask">
    <option value="null" disabled selected>Choose type of task</option>
    <option value="frontend">Front-End</option>
    <option value="backend">Back-End</option>
    <option value="design">Design</option>
    </select>
    </div>
    <br>
    
    <div>
    <label for="Difficulty">Difficulty</label><br>
    <select name="Difficulty" id="Difficulty">
    <option value="null" disabled selected>Difficulty of task</option>
    <option value="easy">easy</option>
    <option value="medium">medium</option>
    <option value="quite hard">quite hard</option>
    <option value="very hard">very hard</option>
    </select>
    </div>
    <br>
    
    <div>
    <label for="Priority">Priority</label><br>
    <select name="Priority" id="Priority">
    <option value="null" disabled selected>Priority of task</option>
    <option value="very urgent">very urgent</option>
    <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
    </select>
    </div>
    <br>
    
    <div>
    <label for="StateOfTask">State of Task</label><br>
    <select name="StateOfTask" id="StateOfTask">
    <option value="null" disabled selected>Choose state of task</option>
    <option value="Pending">Pending</option>
    <option value="In Progress">In Progress</option>
    <option value="Completed">Completed</option>
    </select>
    </div>
    <br>
    
    </div>
    <!-- end inputs -->
    </div>
    </div>
    <div class="mdl-dialog__actions">
    <!-- begin dialog actions -->
    <button type="button" class="mdl-button close" onclick="cancelCreatedTask()" id="dialogCancel">Cancel</button>
    <button type="button" class="mdl-button" onclick="saveTask2(${i})">Confirm</button>
    <!-- end dialog actions -->
    
    </div>`
    
    document.getElementById("addDialog").innerHTML = out;
    let productlog = ls.getItem(`productlog`);
    let productlogtask = JSON.parse(productlog);
    let parse = productlogtask._tasks[i-1]
    let name = parse._name;
    let desc = parse._desc;
    let assingee = parse._assignee;
    let type = parse._type;
    let diff = parse._diff;
    let prio = parse._prio;
    let state = parse._state;
    
    document.getElementById("new_name").value = name;
    document.getElementById("new_desc").value = desc;
    document.getElementById("new_assignee").value = assingee;
    document.getElementById("TypeOfTask").value = type;
    document.getElementById("Difficulty").value = diff;
    document.getElementById("Priority").value = prio;
    document.getElementById("StateOfTask").value = state;
    dialog.showModal();
    
}

function saveTask2(i){
    let name = document.getElementById("new_name").value;
    let desc = document.getElementById("new_desc").value;
    let assignee = document.getElementById("new_assignee").value;
    let type = document.getElementById("TypeOfTask").value;
    let diff = document.getElementById("Difficulty").value;
    let prio = document.getElementById("Priority").value;
    let state = document.getElementById("StateOfTask").value;
    let task = new Task(i ,name, desc, assignee, type, diff, prio, state);
    productlog._tasks[i-1] = task;
    ls.setItem(`productlog`, JSON.stringify(productlog));
    dialog.close();
    viewDetails(i);
    displayTask();
}

function closeDialog(){
    dialog2.close();
    displayTask();
}

function deleteTask(i){
    let confirmAction = confirm("Are you sure you want to delete this task?");
    if (confirmAction) {
        let productlog = ls.getItem(`productlog`);
        productlog = JSON.parse(productlog);
        console.log(productlog);
        productlog._tasks.splice(i-1,1);
        console.log(productlog)
        for (let i = 0; i < productlog._tasks.length; i++){
            let task = productlog._tasks[i];
            task._id = i+1;
        }
        ls.setItem(`productlog`, JSON.stringify(productlog));
        displayTask();
    }
    else {
        void(0);
    }
}