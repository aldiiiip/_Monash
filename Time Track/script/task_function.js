"use strict"
// Registers the dialog box polyfill
let dialog = document.getElementById("addDialog");
let dialog2 = document.getElementById("showDialog");
let dialog3 = document.getElementById("filterDialog");
if (!dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
}

if (!dialog2.showModal) {
    dialogPolyfill.registerDialog(dialog2);
}

function changeWindow(id){
    if (id == `sprint`){
        window.location = "sprint_overview.html";
    }
    else if  (id == `product_backlog`){
        window.location = "product_backlog.html";
    }
}

// Open the dialog box when save button being clicked
function createTask() {
    let out = "";
    out += `<h6 class="mdl-dialog__title">Create a task...</h6>
    <div class="mdl-dialog__content">
    <div class="mdl-grid">
    <!-- begin inputs -->

    <div 
    class="mdl-cell mdl-cell--12-col mdl-cell--8-col-desktop">
    <div
    class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
    <input class="mdl-textfield__input" type="text" id="new_name">
    <label for="new_name" class="mdl-textfield__label">Title of task:</label>
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
    <label class ="taskInputs" for="TypeOfTask">Type of Task</label><br>
    <select name="TypeOfTask" id="TypeOfTask">
    <option value="null" disabled selected>Choose type of task</option>
    <option value="User Story">User Story</option>
    <option value="Debug">Debug</option>
    </select>
    </div>
    <br>

    <div>
    <label class ="taskInputs" for="TagOfTask">Tag of Task</label><br>
    <select name="TagOfTask" id="TagOfTask">
    <option value="null" disabled selected>Choose tag of task</option>
    <option value="Front End">Front-End</option>
    <option value="Back End">Back-End</option>
    <option value="Design">Design</option>
    </select>
    </div>
    <br>
    
    <div>
    <label class ="taskInputs" for="Difficulty">Difficulty</label><br>
    <select name="Difficulty" id="Difficulty">
    <option value="null" disabled selected>Difficulty of task</option>
    <option value="Easy">Easy</option>
    <option value="Medium">Medium</option>
    <option value="Quite Hard">Quite hard</option>
    <option value="Very Hard">Very hard</option>
    </select>
    </div>
    <br>
    
    <div>
    <label class ="taskInputs" for="Priority">Priority</label><br>
    <select name="Priority" id="Priority">
    <option value="null" disabled selected>Priority of task</option>
    <option value="Very Urgent">Very urgent</option>
    <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
    </select>
    </div>
    <br>
    
    <div>
    <label class ="taskInputs" for="StateOfTask">State of Task</label><br>
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
    let confirmAction = confirm("Are you sure leave this page? \nThe changes you made will not be saved");
    if (confirmAction) {
        dialog.close();
    }
    else {
        //Remain
        void(0);
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
    let tag = document.getElementById("TagOfTask").value;
    let diff = document.getElementById("Difficulty").value;
    let prio = document.getElementById("Priority").value;
    let state = document.getElementById("StateOfTask").value;
    if (localStorage.length <= 0){
        let task = new Task(masterHouse._productBacklog.length + 1, name, desc, assignee, type, tag, diff, prio, state);
        masterHouse._productBacklog.push(task);
        console.log(masterHouse);
        updateLSData(`masterHouse`,masterHouse);
    }
    else {
        let task = new Task(masterHouse._productBacklog.length + 1, name, desc, assignee, type, tag, diff, prio, state);
        masterHouse._productBacklog.push(task);
        updateLSData(`masterHouse`,masterHouse);
    }
    dialog.close();
    displayTask();
}

/**
* @function displayTask
* display task 
*/
function displayTask() {
    let out = "";
    if (masterHouse._productBacklog.length <= 0){
        out += `<p class="p">Your product backlog is empty. Start by creating a task!</p>`
    }
    else {
        out += `<div class ="grid-container">`
        for (let i = 0; i < masterHouse._productBacklog.length; i++){
            let task = masterHouse._productBacklog[i];
            if (task._tag == "Front End"){
                out += `
                    <div class="card1 mdl-card mdl-shadow--2dp" id="task${task._id}">`
                        
            }
            else if (task._tag == "Back End"){
                out += `
                    <div class="card2 mdl-card mdl-shadow--2dp" id="task${task._id}">`
            }
            else if (task._tag == "Design"){
                out += `
                    <div class="card3 mdl-card mdl-shadow--2dp" id="task${task._id}">`
            }
            else {
                out += `
                    <div class="card4 mdl-card mdl-shadow--2dp" id="task${task._id}">`
            }
            out += `
                    <button id="button${task._id}" class="mdl-button mdl-js-button mdl-button--icon">
                        <i class="material-icons">more_vert</i>
                    </button>
                    <ul class="mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect" for="button${task._id}">
                        <li class="mdl-menu__item">Add Task To Sprint</li>
                        <li class="mdl-menu__item">Copy Task</li>
                        <li class="mdl-menu__item" onclick="deleteTask(${task._id})">Delete Task</li>
                    </ul>

                <div class="mdl-card__title mdl-card--expand">
                    <h2 class="task-name mdl-card__title-textz">${task._name}</h2>
                </div>
                <div class="mdl-card__title mdl-card--expand">
                    <h2 class="task-desc mdl-card__title-text">${task._desc}</h2>
                </div>
                <div class="mdl-card__title mdl-card--expand">
                    <h2 class="task-assignee mdl-card__title-text">Assignee: ${task._assignee}</h2>
                </div>
                <div class="mdl-card__title mdl-card--expand">
                    <h2 class="task-tag mdl-card__title-text">Tag: ${task._tag}</h2>
                </div>  
                <div class="mdl-card__title mdl-card--expand">
                    <h2 class="task-type mdl-card__title-text">Type: ${task._type}</h2>
                </div>
                <div class="mdl-card__title mdl-card--expand">
                    <h2 class="task-prio mdl-card__title-text">Priority: ${task._prio}</h2>
                </div>
                <div class="mdl-card__actions mdl-card--border">
                    <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onclick="viewDetails(${task._id})"> More Details </a>
                </div>
            </div>`
        }
    }
    out += `</div>`;
    document.getElementById("displayCard").innerHTML = out;
    componentHandler.upgradeDom();
}

function viewDetails(i){
    let parse = masterHouse._productBacklog[i-1]
    let name = parse._name;
    let desc = parse._desc;
    let assingee = parse._assignee;
    let type = parse._type;
    let tag = parse._tag;
    let diff = parse._diff;
    let prio = parse._prio;
    let state = parse._state;
    let out = "";
    out += `<div class="mdl-cell mdl-cell--12-col mdl-cell--8-col-desktop">
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
                <label class="mdl-textfield__label" for="new_name">Title of task:</label>
                <p id="taskname">${name}</p>
            </div>
            <br>

            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
                <label class="mdl-textfield__label" for="new_desc">Description:</label>
                <p id="taskdesc">${desc}</p>
            </div>
            <br>

            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
                <label class="mdl-textfield__label" for="new_assignee">Who is assigned:</label>
                <p id="taskassignee">${assingee}</p>
            </div>
            <br>

            <div>
                <label for="TypeOfTask">Type of Task</label><br>
                <p id="tasktype">${type}</p>
            </div>
            <br>

            <div>
                <label for="TagOfTask">Tag of Task</label><br>
                <p id="tasktag">${tag}</p>
            </div>
            <br>

            <div>
                <label for="Difficulty">Difficulty</label><br>
                <p id="taskdiff">${diff}</p>
            </div>
            <br>

            <div>
                <label for="Priority">Priority</label><br>
                <p id="taskprio">${prio}</p>
            </div>
            <br>

            <div>
            <label for="StateOfTask">State of Task</label><br>
            <p id="taskstate">${state}</p>
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
    <label class ="taskInputs" for="TypeOfTask">Type of Task</label><br>
    <select name="TypeOfTask" id="TypeOfTask">
    <option value="null" disabled selected>Choose type of task</option>
    <option value="Debug">Debug</option>
    <option value="User Story">User Story</option>
    </select>
    </div>
    <br>

    <div>
    <label class ="taskInputs" for="TagOfTask">Tag of Task</label><br>
    <select name="TagOfTask" id="TagOfTask">
    <option value="null" disabled selected>Choose tag of task</option>
    <option value="Front End">Front-End</option>
    <option value="Back End">Back-End</option>
    <option value="Design">Design</option>
    </select>
    </div>
    <br>
    
    <div>
    <label class ="taskInputs" for="Difficulty">Difficulty</label><br>
    <select name="Difficulty" id="Difficulty">
    <option value="null" disabled selected>Difficulty of task</option>
    <option value="Easy">easy</option>
    <option value="Medium">medium</option>
    <option value="Quite Hard">quite hard</option>
    <option value="Very Hard">very hard</option>
    </select>
    </div>
    <br>
    
    <div>
    <label class ="taskInputs" for="Priority">Priority</label><br>
    <select name="Priority" id="Priority">
    <option value="null" disabled selected>Priority of task</option>
    <option value="Very Urgent">very urgent</option>
    <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
    </select>
    </div>
    <br>
    
    <div>
    <label class ="taskInputs" for="StateOfTask">State of Task</label><br>
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
    let parse = masterHouse._productBacklog[i-1]
    let name = parse._name;
    let desc = parse._desc;
    let assingee = parse._assignee;
    let type = parse._type;
    let tag = parse._tag;
    let diff = parse._diff;
    let prio = parse._prio;
    let state = parse._state;
    
    document.getElementById("new_name").value = name;
    document.getElementById("new_desc").value = desc;
    document.getElementById("new_assignee").value = assingee;
    document.getElementById("TypeOfTask").value = type;
    document.getElementById("TagOfTask").value = tag;
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
    let tag = document.getElementById("TagOfTask").value;
    let diff = document.getElementById("Difficulty").value;
    let prio = document.getElementById("Priority").value;
    let state = document.getElementById("StateOfTask").value;
    // linear search to find task._id
    let found = -1
    let k = 0
    while (k<masterHouse._productBacklog.length){
        if (masterHouse._productBacklog[k]._id == i){
            found = k
        }
        k += 1
    }
    masterHouse._productBacklog[found]._name = name;
    masterHouse._productBacklog[found]._desc = desc;
    masterHouse._productBacklog[found]._assignee = assignee;
    masterHouse._productBacklog[found]._type = type;
    masterHouse._productBacklog[found]._tag = tag;
    masterHouse._productBacklog[found]._diff = diff;
    masterHouse._productBacklog[found]._prio = prio;
    masterHouse._productBacklog[found]._state = state;
    updateLSData(`masterHouse`,masterHouse);
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
        masterHouse._productBacklog.splice(i-1,1);
        console.log(masterHouse)
        for (let k = 0; k < masterHouse._productBacklog.length; k++){
            let task = masterHouse._productBacklog[k];
            task._id = k+1;
        }
        for (let k = 0; k < masterHouse._sprintBacklog.length; k++){
            let sprint = masterHouse._sprintBacklog[k];
            for (let j = 0; j < sprint._tasklist.length; j++){
                if (sprint._tasklist[j] == i){
                    sprint._tasklist.splice(i-1,1);
                }
            }
            for (let j = 0; j < sprint._tasklist.length; j++){
                if (sprint._tasklist[j] > i){
                    sprint._tasklist[j] -= 1;
                }
            }
        }
        updateLSData(`masterHouse`,masterHouse);
        displayTask();
    }
    else {
        void(0);
    }
}

function showFilterDialog(){
    var x = document.getElementById("displayCard");
    let out = "";
    out += `<h6 class="mdl-dialog__title">Filter by:</h6>
                <div class="mdl-dialog__content">
                    <div class="mdl-grid">
                        <!-- begin inputs -->
                        <div class="mdl-cell mdl-cell--12-col mdl-cell--8-col-desktop">
                        <div>
                            <label for="filterTag">Choose filter tag by: </label>
                            <br>
                            <select id="filterTag" name:"filters">
                                <option value="null" disabled selected></option>
                                <option value="Front End">Front End</option>
                                <option value="Back End">Back End</option>
                                <option value="Design">Design</option>
                            </select>
                        </div>
                    </div>
                    <!-- end inputs -->
                </div>
            </div>
            <div class="mdl-dialog__actions">
                <!-- begin dialog actions -->
                    <button type="button" class="mdl-button close" onclick="dialog.close();" id="dialogCancel">Cancel</button>
                    <button type="button" class="mdl-button" onclick="applyFilter()">Apply</button>
                <!-- end dialog actions -->
            </div>`
    document.getElementById("addDialog").innerHTML = out;
    dialog.showModal();
}
 
 function applyFilter(){
    let values1 = document.getElementById("filterTag").value;
    console.log(values1);
    let index = [];
    for (let i = 0; i < masterHouse._productBacklog.length; i++){
        if (masterHouse._productBacklog[i]._tag == values1){
            index.push(i);
        }
    }
    console.log(index)
    let out = "";
    out += `<div class ="grid-container">`
    for (let i = 0; i < index.length; i++){
        let task = masterHouse._productBacklog[index[i]];
        if (task._tag == "Front End"){
            out += `
                <div class="card1 mdl-card mdl-shadow--2dp" id="task${task._id}">`
                    
        }
        else if (task._tag == "Back End"){
            out += `
                <div class="card2 mdl-card mdl-shadow--2dp" id="task${task._id}">`
        }
        else if (task._tag == "Design"){
            out += `
                <div class="card3 mdl-card mdl-shadow--2dp" id="task${task._id}">`
        }
        else {
            out += `
                <div class="card4 mdl-card mdl-shadow--2dp" id="task${task._id}">`
        }
        out += `
                <button id="button${task._id}" class="mdl-button mdl-js-button mdl-button--icon">
                    <i class="material-icons">more_vert</i>
                </button>
                <ul class="mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect" for="button${task._id}">
                    <li class="mdl-menu__item">Add Task To Sprint</li>
                    <li class="mdl-menu__item">Copy Task</li>
                    <li class="mdl-menu__item" onclick="deleteTask(${task._id})">Delete Task</li>
                </ul>

            <div class="mdl-card__title mdl-card--expand">
                <h2 class="task-name mdl-card__title-textz">${task._name}</h2>
            </div>
            <div class="mdl-card__title mdl-card--expand">
                <h2 class="task-desc mdl-card__title-text">${task._desc}</h2>
            </div>
            <div class="mdl-card__title mdl-card--expand">
                <h2 class="task-assignee mdl-card__title-text">Assignee: ${task._assignee}</h2>
            </div>
            <div class="mdl-card__title mdl-card--expand">
                <h2 class="task-tag mdl-card__title-text">Tag: ${task._tag}</h2>
            </div>  
            <div class="mdl-card__title mdl-card--expand">
                <h2 class="task-type mdl-card__title-text">Type: ${task._type}</h2>
            </div>
            <div class="mdl-card__title mdl-card--expand">
                <h2 class="task-prio mdl-card__title-text">Priority: ${task._prio}</h2>
            </div>
            <div class="mdl-card__actions mdl-card--border">
                <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onclick="viewDetails(${task._id})"> More Details </a>
            </div>
        </div>`
    }
    out += `</div>` 
    var x = document.getElementById("displayCard");
    x.style.display = "none";
    x = document.getElementById("filterCards");
    x.style.display = "block";
    document.getElementById("filterCards").innerHTML = out;
    var btn = document.getElementById("clearFilterBtn");
    btn.style.visibility = "visible";
    btn = document.getElementById("filterBtn");
    btn.style.visibility = "hidden";
    dialog.close();
}

// filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

function clearFilter(){
    var x = document.getElementById("filterCards");
    x.style.display = "none";
    x = document.getElementById("displayCard");
    x.style.display = "block";
    var btn = document.getElementById("filterBtn");
    btn.style.visibility = "visible";
    btn = document.getElementById("clearFilterBtn");
    btn.style.visibility = "hidden";
}