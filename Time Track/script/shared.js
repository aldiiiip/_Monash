/**
 * the start of the masterlist of all the classes that will be used in the HTML
 */
 class Task
{
    constructor(id = "",task_name = "", task_desc = "", assignee = "", task_type= "", task_tag= "", task_diff= "", task_prio= "", task_state= "", tasktime = [], inSprint = 0)
    {
        this._id = id
        this._name = task_name;
        this._desc = task_desc;
        this._assignee = assignee;
        this._type = task_type;
        this._tag = task_tag;
        this._diff = task_diff;
        this._prio = task_prio;
        this._state = task_state;
        this._tasktime = tasktime;
        this._inSprint = inSprint;
    }

    get get_name()
    {
    return this._name;
    }

    get get_desc()
    {
    return this._desc;
    }

    get get_assignee()
    {
    return this._assignee;
    }

    get get_type()
    {
    return this._type;
    }

    get get_tag()
    {
    return this._tag;
    }

    get get_diff()
    {
        return this._diff;
    }

    get get_prio()
    {
        return this._prio;
    }

    get get_state()
    {
        return this._state;
    }

    set set_name(new_name)
    {
        this._name = new_name
    }

    set set_desc(new_desc)
    {
        this._desc = new_desc;
    }

    set set_assignee(new_assignee)
    {
        this._assignee = new_assignee;
    }

    set set_type(new_type)
    {
        this._type = new_type;
    }

    set set_tag(new_tag)
    {
        this._tag = new_tag;
    }

    set set_diff(new_diff)
    {
        this._diff = new_diff;
    }

    set set_prio(new_prio)
    {
        this._prio = new_prio;
    }

    set set_state(new_state)
    {
        this._state = new_state;
    }

    fromData(data){
        this._id = data._id;
        this._name = data._name;
        this._desc = data._desc;
        this._assignee = data._assignee;
        this._type = data._type;
        this._tag = data._tag;
        this._diff = data._diff;
        this._prio = data._prio;
        this._state = data._state;
        this._inSprint = data._inSprint;
        if (data._tasktime.length > 0){
            for (let i = 0; i < data._tasktime.length; i++){
                this._tasktime.push(data._tasktime[i])
            }
        }
        else {
            this._tasktime = []
        }
    }
}
 
 /**
  * this part onwards so important but i just type it here for future usage
  */
class sprints
{
}

class sprint_backlog
{
    constructor(id = "", name = "", start_date = "", end_Date = "", status = "Pending")
    {
        this._id = id;
        this._name = name;
        this._status = status;
        this._startDate = start_date;
        this._endDate = end_Date;
        this._tasklist = [];
    }
    
    fromData(data){
        this._id = data._id;
        this._name = data._name;
        this._status = data._status;
        this._startDate = data._startDate;
        this._endDate = data._endDate;
        this._tasklist = [];
        for (let i = 0; i < data._tasklist.length; i++){
            this._tasklist.push(data._tasklist[i]);
        }
    }
}

class User 
{
    constructor(fName = "", lName = "", email = "", role = "")
    {
        this._fName = fName;
        this._lName = lName;
        this._email = email;
        this._role = role;
    }

    fromData(data){
        this._fName = data._fName;
        this._lName = data._lName;
        this._email = data._email;
        this._role = data._role;
    }
}
class warehouse
{
    constructor()
    {
        this._productBacklog = [];
        this._sprintBacklog = [];
        this._users = [];
    }

    fromData(data){
        this._productBacklog = [];
        this._sprintBacklog = [];
        this._users = [];
        for (let i = 0; i < data._productBacklog.length; i++){
            let newTask = new Task();
            newTask.fromData(data._productBacklog[i]);
            this._productBacklog.push(newTask);
        }
        for (let i = 0; i < data._sprintBacklog.length; i++){
            let newSprint = new sprint_backlog();
            newSprint.fromData(data._sprintBacklog[i]);
            this._sprintBacklog.push(newSprint);
        }
        for (let i = 0; i < data._users.length; i++){
            let newUser = new User();
            newUser.fromData(data._users[i]);
            this._users.push(newUser);
        }
    }
}

/**
 * checkLSData function
 * Used to check if any data in LS exists at a specific key
 * @param {string} key LS Key to be used
 * @returns true or false representing if data exists at key in LS
 */
function checkLSData(key)
{
    if (localStorage.getItem(key) != null)
    {
        return true;
    }
    return false;
}

/**
 * retrieveLSData function
 * Used to retrieve data from LS at a specific key. 
 * @param {string} key LS Key to be used
 * @returns data from LS in JS format
 */
function retrieveLSData(key)
{
    let data = localStorage.getItem(key);
    try
    {
        data = JSON.parse(data);
    }
    catch(err){}
    finally
    {
        return data;
    }
}

/**
 * updateLSData function
 * Used to store JS data in LS at a specific key
 * @param {string} key LS key to be used
 * @param {any} data data to be stored
 */
function updateLSData(key, data)
{
    let json = JSON.stringify(data);
    localStorage.setItem(key, json);
}

let masterHouse = new warehouse();
let sprintID = null;

if (checkLSData(`masterHouse`)) {
    // If data exists, retrieve it
    let data = retrieveLSData(`masterHouse`);
    // Restore data into inventory
    masterHouse.fromData(data);
}