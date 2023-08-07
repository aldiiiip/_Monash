" use strict"
/** dialog section */
let universalDialog = document.getElementById("universalDialog");
if (!universalDialog.showModal) {
    dialogPolyfill.registerDialog(universalDialog);
}
let universalDialog2 = document.getElementById("universalDialog2");
if (!universalDialog2.showModal) {
    dialogPolyfill.registerDialog(universalDialog2);
}

function changeWindow(id){
    if (id == `sprint`){
        window.location = "sprint_overview.html";
    }
    else if  (id == `product_backlog`){
        window.location = "product_backlog.html";
    }
}

function displaySprint(){
    let out = "";
    if (masterHouse._sprintBacklog.length <= 0){
        out += `<p style="text-align:center">Your sprint backlog is empty. Start by creating a new sprint!</p>`
    }
    else {
        out += `<div class="mdl-grid">
                    <table style="margin-left:auto; margin-right:auto;" class="mdl-data-table mdl-js-data-table" id = "sprintDetails">
                    <thead>
                        <tr>
                            <th class="mdl-data-table__cell--non-numeric">No.</th>
                            <th class="mdl-data-table__cell--non-numeric">Name of Sprints</th>
                            <th class="mdl-data-table__cell--non-numeric">Duration of this Sprint(start-end)</th>
                            <th class="mdl-data-table__cell--non-numeric">Active / Inactive</th>
                            <th class="mdl-data-table__cell--non-numeric">View Sprint Details</th>
                        </tr>
                    </thead>
                    <tbody>`
                    
        for (let i = 0; i < masterHouse._sprintBacklog.length; i++){
            let sprint = masterHouse._sprintBacklog[i];
            out += `<tr>
                        <td>${sprint._id}</td>
                        <td>
                            <button class="mdl-button mdl-js-button" onclick="displayDetailsTable(${sprint._id})" style="display: flex;">
                                ${sprint._name}
                            </button></td>
                        <td style="text-align: center;">${sprint._startDate} ~ ${sprint._endDate}</td>
                        <td style="text-align: center;">${sprint._status}</td>
                        <td> <button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onclick="editSprintInfo(${sprint._id})"> Edit Sprint </button></td>
                    </tr>`
        }
        out += `</tbody>
        </table>
        </div>`
    }
    document.getElementById("sprintListTable").innerHTML = out;
}


function createSprint()
{
    let out = "";
    out += `<h6 class="mdl-dialog__title">Create New Sprint.</h6>
    <div class="mdl-dialog__content">
    <div class="mdl-grid">
    <!-- begin inputs -->
    
    <div class="mdl-cell mdl-cell--12-col mdl-cell--8-col-desktop">
    <div
    class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
    <input class="mdl-textfield__input" type="text" id="new_sprint_name">
    <label class="mdl-textfield__label" for="new_sprint_name">Title of task:</label>
    </div><br>
    <div
    class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
    <input class="mdl-textfield__input" type="date" id="start_time">
    <label class="mdl-textfield__label" for="start_time">Start Time:</label>
    </div><br>
    
    <div
    class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
    <input class="mdl-textfield__input" type="date" id="end_time">
    <label class="mdl-textfield__label" for="end_time">End time:</label>
    </div><br>

    <div>
        <div class="tip"><label for="choose_tasks">Choose Tasks: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;?
        <span class="tiptext">Press Ctrl while choosing tasks</span>
        </label></div>
        <br>
        <select name="choose_tasks" id="choose_tasks" size=5 multiple >
        </select>
        </div>
        </br>
    </div>
    
    <br>
    
    <!-- end inputs -->
    </div>
    </div>
    <div class="mdl-dialog__actions">
    <!-- begin dialog actions -->
    <button type="button" class="mdl-button close" onclick="universalDialog.close();" id="dialogCancel">Cancel</button>
    <button type="button" class="mdl-button" onclick="saveSprint()">Confirm</button>
    <!-- end dialog actions -->
    
    </div>
    <!-- end inputs -->`;


    document.getElementById("universalDialog").innerHTML = out;
    let productlogs = document.getElementById("choose_tasks");
    for (let i = 0; i < masterHouse._productBacklog.length; i++) {
        if (masterHouse._productBacklog[i]._inSprint == 0){
            let option = document.createElement("option");
            option.setAttribute('value', masterHouse._productBacklog[i]._id);
        
            let optionText = document.createTextNode(masterHouse._productBacklog[i]._name);
            option.appendChild(optionText);
        
            productlogs.appendChild(option);
        }  
    }
    universalDialog.showModal();

}

function saveSprint(){
    let name = document.getElementById("new_sprint_name").value;
    let start_time = document.getElementById("start_time").value;
    let end_time = document.getElementById("end_time").value;
    if (name == "" || start_time == "" || end_time == ""){
        alert("All areas must not be empty!");
        return false;
    }
    if (start_time > end_time){
        alert("End date cannot be before start date!");
    }
    else {
        var tasks = [];
        for (var option of document.getElementById('choose_tasks').options)
        {
            if (option.selected) {
                tasks.push(parseInt(option.value));
            }
        }

        if (masterHouse._sprintBacklog.length <= 0){
            let sprint = new sprint_backlog(1, name, start_time, end_time);
            for (let i = 0; i < tasks.length; i++){
                sprint._tasklist.push(tasks[i]);
                masterHouse._productBacklog[tasks[i]-1]._inSprint = 1;
            }
            masterHouse._sprintBacklog.push(sprint);
            updateLSData(`masterHouse`,masterHouse);
        }
        else {
            let sprint = new sprint_backlog(masterHouse._sprintBacklog.length + 1, name, start_time, end_time);
            for (let i = 0; i < tasks.length; i++){
                if (masterHouse._productBacklog[tasks[i]-1]._inSprint == 0){
                    sprint._tasklist.push(tasks[i]);
                    masterHouse._productBacklog[tasks[i]-1]._inSprint = masterHouse._sprintBacklog.length + 1;
                }
            }
            masterHouse._sprintBacklog.push(sprint);
            updateLSData(`masterHouse`,masterHouse);
        }
        universalDialog.close();
        displaySprint();
    }
}

function editSprintInfo(id){
    let out = "";
    out += `<h6 class="mdl-dialog__title">Create New Sprint.</h6>
    <div class="mdl-dialog__content">
    <div class="mdl-grid">
    <!-- begin inputs -->
    
    <div class="mdl-cell mdl-cell--12-col mdl-cell--8-col-desktop">
    <div
    class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
    <input class="mdl-textfield__input" type="text" id="new_sprint_name">
    <label class="mdl-textfield__label" for="new_sprint_name">Title of task:</label>
    </div><br>
    <div
    class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
    <input class="mdl-textfield__input" type="date" id="start_time">
    <label class="mdl-textfield__label" for="start_time">Start Time:</label>
    </div><br>
    
    <div
    class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
    <input class="mdl-textfield__input" type="date" id="end_time">
    <label class="mdl-textfield__label" for="end_time">End time:</label>
    </div>
    <!-- end inputs -->
    </div>
    </div>
    <div class="mdl-dialog__actions">
    <!-- begin dialog actions -->
    <button type="button" class="mdl-button close" onclick="universalDialog.close();" id="dialogCancel">Cancel</button>
    <button type="button" class="mdl-button" onclick="deleteSprint(${id})">Delete Sprint</button>
    <button type="button" class="mdl-button" onclick="saveSprint2(${id})">Confirm</button>
    <!-- end dialog actions -->
    
    </div>
    <!-- end inputs -->`;
    
    document.getElementById("universalDialog").innerHTML = out;
    var currentSprint = masterHouse._sprintBacklog[id-1];
    var sprintName = currentSprint._name;
    var sDate = currentSprint._startDate;
    var eDate = currentSprint._endDate;
    
    document.getElementById("new_sprint_name").value = sprintName;
    document.getElementById("end_time").value = eDate;
    document.getElementById("start_time").value = sDate;
    universalDialog.showModal();
}

function saveSprint2(id){
    var sprintName = document.getElementById("new_sprint_name").value;
    var sDate = document.getElementById("start_time").value;
    var eDate = document.getElementById("end_time").value ;
    var saveSprint = masterHouse._sprintBacklog[id-1];
    if (sprintName == "" || sDate == "" || eDate == ""){
        alert("All areas must not be empty!");
        return false;
    }
    if (sDate > eDate){
        alert("End date cannot be before start date!");
    }
    else {
        saveSprint._name = sprintName;
    saveSprint._startDate = sDate;
    saveSprint._endDate = eDate;
    updateLSData(`masterHouse`,masterHouse); 
    universalDialog.close();
    displaySprint();
    }
}


function displayDetailsTable(id){
    // check if sprint is already ongoing or completed
    var sprint = masterHouse._sprintBacklog[id-1];

    var sprintTable = document.getElementById("sprintListTable");
    sprintTable.style.display = "none";
    var createSprintBtn = document.getElementById("createSprintBtn");
    createSprintBtn.style.display = "none";
    var detailsTable = document.getElementById("details");
    detailsTable.style.display = "block";
    var sprintBtns = document.getElementById("sprintBtns");
    sprintBtns.style.display = "block";
    var startSprintBtn = document.getElementById("startSprintBtn");
    startSprintBtn.setAttribute("onclick",`startSprint(${id})`);
    var endSprintBtn = document.getElementById("endSprintBtn");
    endSprintBtn.setAttribute("onclick",`endSprint(${id})`);
    var addTaskBtn = document.getElementById("addTaskBtn");
    addTaskBtn.setAttribute("onclick",`addTasks(${id})`);
    if (sprint._status == "ongoing"){
        addTaskBtn.style.display = "none";
        startSprintBtn.disabled = true;
        endSprintBtn.disabled = false;
    }
    else if (sprint._status == "completed"){
        addTaskBtn.style.display = "none";
        startSprintBtn.disabled = true;
        endSprintBtn.disabled = true;
    }
    else {
        addTaskBtn.style.display = "block";
        startSprintBtn.disabled = false;
        endSprintBtn.disabled = true;
    }
    
    // display table section
    tableid = "sprintDetail".concat(id.toString());
    let table = "";
    table += `<table style="margin-left:auto; margin-right:auto;" id=${tableid} class="mdl-data-table mdl-js-data-table">
                <thead>
                <tr>
                <th class="mdl-data-table__cell--non-numeric">No.</th>
                    <th class="mdl-data-table__cell--non-numeric" id="pending">Pending</th>
                    <th class="mdl-data-table__cell--non-numeric" id="progress">In Progress</th>
                    <th class="mdl-data-table__cell--non-numeric" id="complete">Completed</th>
                </tr>
                </thead>
                <tbody>` 
    // put all the items inside
    for (let i = 0; i < sprint._tasklist.length; i++){
        if (masterHouse._productBacklog[sprint._tasklist[i]-1]._state == "completed"){
            table += 
                `<tr>
                    <td>${i+1}</td>
                    <td></td>
                    <td></td>
                    <td><button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onclick="showTaskDetails(${i+1},${id})">${masterHouse._productBacklog[sprint._tasklist[i]-1]._name}</button></td>
                </tr>`
        }
        else if (masterHouse._productBacklog[sprint._tasklist[i]-1]._tasktime.length > 0){
            table += 
                `<tr>
                    <td>${i+1}</td>
                    <td></td>
                    <td><button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onclick="showTaskDetails(${i+1},${id})">${masterHouse._productBacklog[sprint._tasklist[i]-1]._name}</button></td>
                    <td></td>
                </tr>`
        }
        else {
            table += 
                `<tr>
                    <td>${i+1}</td>
                    <td><button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onclick="showTaskDetails(${i+1},${id})">${masterHouse._productBacklog[sprint._tasklist[i]-1]._name}</button></td>
                    <td></td>
                    <td></td>
                </tr>`
        }
    }
    // close the table
    table += `</tbody>
            </table>`
    document.getElementById("details").innerHTML = table;
}

function backToOverview(){
    displaySprint();
    var sprintTable = document.getElementById("sprintListTable");
    sprintTable.style.display = "block";
    var createSprintBtn = document.getElementById("createSprintBtn");
    createSprintBtn.style.display = "block";
    var detailsTable = document.getElementById("details");
    detailsTable.style.display = "none";
    var sprintBtns = document.getElementById("sprintBtns");
    sprintBtns.style.display = "none";
    var addTaskBtn = document.getElementById("addTaskBtn");
    addTaskBtn.style.display = "none";
}

function startSprint(id){
    // change sprint status to ongoing
    masterHouse._sprintBacklog[id-1]._status = "ongoing";
    updateLSData(`masterHouse`, masterHouse);
    displayDetailsTable(id)
}

function endSprint(id){
    // change sprint status to completed
    masterHouse._sprintBacklog[id-1]._status = "completed";
    updateLSData(`masterHouse`, masterHouse);
    for (let i = 0; i <  masterHouse._sprintBacklog[id-1]._tasklist.length; i++){
        if (masterHouse._productBacklog[masterHouse._sprintBacklog[id-1]._tasklist[i]-1]._state != "completed"){
            masterHouse._productBacklog[masterHouse._sprintBacklog[id-1]._tasklist[i]-1]._state = "pending";
            masterHouse._productBacklog[masterHouse._sprintBacklog[id-1]._tasklist[i]-1]._inSprint = 0;
        }
        
    }
    displayDetailsTable(id);
}

function addTasks(id){
    let out = "";
    out += `<h6 class="mdl-dialog__title">Add Tasks</h6>
    <div class="mdl-dialog__content">
    <div class="mdl-grid">
    <!-- begin inputs -->
    <div>
    <label for="chooseToAddTask">Choose Tasks:</label>
    <br>
    <select name="chooseToAddTask" id="chooseToAddTask" size=5 multiple >
    </select>
    </div>
    <br>
    
    <!-- end inputs -->
    </div>
    </div>
    <div class="mdl-dialog__actions">
    <!-- begin dialog actions -->
    <button type="button" class="mdl-button close" onclick="universalDialog.close();" id="dialogCancel">Cancel</button>
    <button type="button" class="mdl-button" onclick="confirmAddTask(${id})">Confirm</button>
    <!-- end dialog actions -->
    
    </div>
    <!-- end inputs -->`;

    document.getElementById("universalDialog").innerHTML = out;

    let productlogs = document.getElementById("chooseToAddTask");
    for (let i = 0; i < masterHouse._productBacklog.length; i++) {
        if (masterHouse._productBacklog[i]._inSprint == 0){
            let option = document.createElement("option");
            option.setAttribute('value', masterHouse._productBacklog[i]._id);
        
            let optionText = document.createTextNode(masterHouse._productBacklog[i]._name);
            option.appendChild(optionText);
        
            productlogs.appendChild(option);
        }
    }
    universalDialog.showModal();
}

function confirmAddTask(id){    
    var tasks = [];
    for (var option of document.getElementById('chooseToAddTask').options)
    {
        if (option.selected) {
            tasks.push(parseInt(option.value));
        }
    }
    console.log(tasks)
    var newTaskList = [], found = false;
    for (let i = 0; i < tasks.length; i++){
        for (let j = 0; j < masterHouse._sprintBacklog[id-1]._tasklist.length; j++){
            console.log(masterHouse._productBacklog[tasks[i]-1])
            console.log(masterHouse._productBacklog[tasks[i]-1]._inSprint)
            console.log(id)
            if (tasks[i] == masterHouse._sprintBacklog[id-1]._tasklist[j]){
                found = true;
            }
        }
        if (found == false){
            newTaskList.push(tasks[i]);
        }
        else {
            found = false;
        }
    }
    console.log(newTaskList)
    if (newTaskList.length > 0){
        for (let j = 0; j < newTaskList.length; j++){
            masterHouse._sprintBacklog[id-1]._tasklist.push(newTaskList[j]);
        }
        masterHouse._sprintBacklog[id-1]._tasklist.sort(function(a, b) {
            return a - b;
        });
        updateLSData(`masterHouse`,masterHouse);
    }
    displayDetailsTable(id);
    universalDialog.close();
}

// add accumulated time
// change task status (if tasktime length > 0 move to center of the table)
// mark complete for task (move to last table)
function showTaskDetails(taskid,sprintid){
    let out = "";
    let parse = masterHouse._productBacklog[masterHouse._sprintBacklog[sprintid-1]._tasklist[taskid-1]-1];
    let name = parse._name;
    let desc = parse._desc;
    let assingee = parse._assignee;
    let type = parse._type;
    let tag = parse._tag;
    let diff = parse._diff;
    let prio = parse._prio;
    let state = parse._state;
    out += `
            <div class="mdl-cell mdl-cell--12-col mdl-cell--8-col-desktop">
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
    
                <button class="mdl-button mdl-js-button mdl-button--icon" onclick="removeTaskFromSprint(${taskid},${sprintid})" style="position: absolute; top: 25px; right: 25px;">
                    <i class="material-icons">delete</i>
                </button>
                <!-- Raised button with ripple -->
                <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onclick="logTime(${taskid},${sprintid})" >Log Time</button>
                <!-- Raised button with ripple -->
                <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" id="taskCompleteBtn" onclick = "markTaskCompleted(${taskid},${sprintid})" disabled >Mark Complete</button>
                <!-- Raised button with ripple -->
                <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onclick = "universalDialog.close();displayDetailsTable(${sprintid})">Done</button>

            </div>`;
    document.getElementById("universalDialog").innerHTML = out;
    if (masterHouse._sprintBacklog[sprintid-1]._status == "ongoing"){
        document.getElementById("taskCompleteBtn").disabled = false;
    }
    if (masterHouse._productBacklog[masterHouse._sprintBacklog[sprintid-1]._tasklist[taskid-1]-1]._state == "completed"){
        document.getElementById("taskCompleteBtn").disabled = true;
    }
    universalDialog.showModal();    
}

function deleteSprint(i){
    let confirmAction = confirm("Are you sure you want to delete this sprint?");
    if (confirmAction) {
        for (let k = 0; k < masterHouse._sprintBacklog[i-1]._tasklist.length; k++){
            masterHouse._productBacklog[masterHouse._sprintBacklog[i-1]._tasklist[k]-1]._inSprint = 0;
        }
        masterHouse._sprintBacklog.splice(i-1,1);
        console.log(masterHouse)
        for (let k = 0; k < masterHouse._sprintBacklog.length; k++){
            let sprint = masterHouse._sprintBacklog[k];
            sprint._id = k+1;
        }
        updateLSData(`masterHouse`,masterHouse);
        universalDialog.close();
        displaySprint();
    }
    else {
        void(0);
    }
}

function logTime(taskid, sprintid){
    universalDialog.close();   
    let out = "";
    let task = masterHouse._productBacklog[masterHouse._sprintBacklog[sprintid-1]._tasklist[taskid-1]-1];
    let timespent = task._tasktime;
    out += `
        <table style="margin-left:auto; margin-right:auto;" id=${sprintid} class="mdl-data-table mdl-js-data-table">
                <thead>
                    <tr>
                        <th class="mdl-data-table__cell--non-numeric">No.</th>
                        <th class="mdl-data-table__cell--non-numeric" id="progress">Date</th>
                        <th class="mdl-data-table__cell--non-numeric" id="progress">Duration (hr:mm)</th>
                    </tr>
                </thead>
                <tbody>` 
    if (timespent.length == 0){
        out +=  `<tr>
                    <td id="log1">1</td>
                    <td><input class="mdl-textfield__input" name="loggeddate" type="date" id="inputdate1"></td>
                    <td>
                        <input name="loggedtime" id="inputdatehr1" style="float:left; margin-left:10px;">
                        <input name="loggedtime" id="inputdatemm1" style="float:left; margin-left:10px;">
                    </td>
                </tr>`
    }
    else {
        for (let i = 0; i < timespent.length; i++){
            out += `<tr>
                        <td id="log${i}">${i+1}</td>
                        <td><input class="mdl-textfield__input" name="loggeddate" type="date" id="inputdate${i+1}"></td>
                        <td>
                            <input name="loggedtime" id="inputdatehr${i+1}" style="float:left; margin-left:10px">
                            <input name="loggedtime" id="inputdatemm${i+1}" style="float:left; margin-left:10px">
                        </td>
                    </tr>`
        }
    }
    out += `</tbody>
            </table>
            <!-- Raised button with ripple -->
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" id="logTimeSaveBtn" onclick="checkTime(${taskid},${sprintid});" disabled>Save Time</button>
            <!-- Raised button with ripple -->
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"  id="logTimeAddRowBtn" onclick ="addRow(${taskid},${sprintid})" disabled>New Row</button>
            <!-- Raised button with ripple -->
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" id="logTimeDelRowBtn" onclick ="deleteLastRow(${taskid},${sprintid})" disabled>Delete Last Row</button>
            <!-- Raised button with ripple -->
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onclick="universalDialog2.close();">Close</button>
            
        `;
    document.getElementById("universalDialog2").innerHTML = out;
    if (timespent.length > 0){
        for (let i = 0; i < timespent.length; i++){
            document.getElementById("inputdate"+(i+1)).value = timespent[i][0];
            var timehr = Math.floor(timespent[i][1] / 60)
            var timemm = timespent[i][1] % 60
            document.getElementById("inputdatehr"+(i+1)).value = timehr;
            document.getElementById("inputdatemm"+(i+1)).value = timemm;
        }
    }
    if (masterHouse._sprintBacklog[sprintid-1]._status == "ongoing"){
        document.getElementById("logTimeSaveBtn").disabled = false;
        document.getElementById("logTimeAddRowBtn").disabled = false;
        document.getElementById("logTimeDelRowBtn").disabled = false;
    }
    if (masterHouse._productBacklog[masterHouse._sprintBacklog[sprintid-1]._tasklist[taskid-1]-1]._state == "completed"){
        document.getElementById("logTimeSaveBtn").disabled = true;
        document.getElementById("logTimeAddRowBtn").disabled = true;
        document.getElementById("logTimeDelRowBtn").disabled = true;
    }
    universalDialog2.showModal(); 
}

function checkTime(taskid, sprintid){
    var valueTime = document.getElementsByName("loggedtime");
    var valueDate = document.getElementsByName("loggeddate");
    var dateflag = false;
    var datetimehr = false;
    var datetimemm = false;
    for (let i = 0; i < valueDate.length; i++){
        if (valueDate[i].value == "" || valueDate[i].value < masterHouse._sprintBacklog[sprintid-1]._startDate){
            dateflag = true;
        }
    }
    for (let i = 0; i < valueTime.length; i += 2){
        if (valueTime[i].value == "" || valueTime[i].value < 0 || valueTime[i].value > 24){
            datetimehr = true;
        }
        if (valueTime[i+1].value == "" || valueTime[i+1].value < 0 || valueTime[i+1].value > 60){
            datetimemm = true;
        }
    }
    if (dateflag == true){
        alert("date format is wrong");
    }
    else if (datetimehr == true){
        alert("hour format is wrong");
    }
    else if (datetimemm == true){
        alert("minute format is wrong");
    }
    else {
        saveLogTime(taskid, sprintid);
    }
}
function saveLogTime(taskid, sprintid){
    var valueTime = document.getElementsByName("loggedtime");
    var valueDate = document.getElementsByName("loggeddate");
    var newTime = [];
    for (let i = 0; i < valueDate.length; i++){
        var date = valueDate[i].value;
        var time = parseInt(valueTime[i * 2].value)*60 + parseInt(valueTime[i * 2 + 1].value);
        var tuple = [date, time];
        newTime.push(tuple);
    }
    masterHouse._productBacklog[masterHouse._sprintBacklog[sprintid-1]._tasklist[taskid-1]-1]._tasktime = newTime;
    updateLSData(`masterHouse`,masterHouse);
    universalDialog2.close();
    showTaskDetails(taskid, sprintid);
}

function addRow(taskid, sprintid){
    var table = document.getElementById(sprintid).tBodies[0];
    // Create an empty <tr> element and add it to the 1st position of the table:
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var currentrowCount = table.rows.length;
    console.log(currentrowCount)
    cell1.innerHTML = currentrowCount;
    cell2.innerHTML = `<input class="mdl-textfield__input" name="loggeddate" type="date" id="inputdate${currentrowCount}">`;
    cell3.innerHTML = `<input name="loggedtime" id="inputdatehr${currentrowCount}" style="float:left; margin-left:10px">
                    <input name="loggedtime" id="inputdatemm${currentrowCount}" style="float:left; margin-left:10px">`;
}

function deleteLastRow(taskid, sprintid){
    var table = document.getElementById(sprintid);
    var currentrowCount = table.tBodies[0].rows.length;
    if (currentrowCount == 0){
        alert("there are no time to delete");
    }
    else {
        document.getElementById(sprintid).deleteRow(-1);
        masterHouse._productBacklog[masterHouse._sprintBacklog[sprintid-1]._tasklist[taskid-1]-1]._tasktime.pop();
        updateLSData(`masterHouse`,masterHouse);
    }
    
}

function markTaskCompleted(taskid, sprintid){
    masterHouse._productBacklog[masterHouse._sprintBacklog[sprintid-1]._tasklist[taskid-1]-1]._state = "completed";
    updateLSData(`masterHouse`,masterHouse);
    document.getElementById("logTimeAddRowBtn").disabled = true;
    document.getElementById("taskCompleteBtn").disabled = true;
    showTaskDetails(taskid,sprintid);
}

function removeTaskFromSprint(taskid, sprintid){
    if (masterHouse._sprintBacklog[sprintid-1]._status == "ongoing" || masterHouse._sprintBacklog[sprintid-1]._status == "completed" || masterHouse._productBacklog[masterHouse._sprintBacklog[sprintid-1]._tasklist[taskid-1]-1]._state == "completed"){
        alert("Task cannot be removed!");
    }
    else {
        let confirmAction = confirm("Are you sure you want to remove task from this sprint?");
        if (confirmAction) {
            masterHouse._productBacklog[masterHouse._sprintBacklog[sprintid-1]._tasklist[taskid-1]-1]._inSprint = 0;
            masterHouse._sprintBacklog[sprintid-1]._tasklist.splice(taskid-1,1);
            console.log(masterHouse)
            updateLSData(`masterHouse`,masterHouse);
            universalDialog.close();
            displayDetailsTable(sprintid);
        }
        else {
            void(0);
        }
    }
    
}