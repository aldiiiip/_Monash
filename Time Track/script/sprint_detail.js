"use strict"

function displaySprintTable(){
    let table = "";
    // console.log(masterHouse._productBacklog,length);
    // console.log(masterHouse._sprintBacklog.length);
    // console.log(masterHouse._sprintBacklog._taskList);
    // console.log("test");
    table += `<table id="sprintDetails" class="mdl-data-table mdl-js-data-table">
                    <thead>
                        <tr>
                            <th class="mdl-data-table__cell--non-numeric">PENDING</th>
                            <th class="mdl-data-table__cell--non-numeric">IN PROGRESS</th>
                            <th class="mdl-data-table__cell--non-numeric">COMPLETED</th>
                            <th class="mdl-data-table__cell--non-numeric">TIME SPENT</th>
                        </tr>
                        <td>test</td>
                        <td>test</td>
                        `            
                    
    for (let i = 0; i < masterHouse._sprintBacklog.length; i++){
            let sprintData = masterHouse._sprintBacklog[i];
            console.log(sprintData._tasklist.length);
            console.log(i);
            console.log(sprintID);
            let pendingTask = [];
            let progressTask =[];
            let completedTask =[];

            if(sprintData._tasklist[i]._state=="In Progress"){
                console.log("in progress");
            }
            else if(sprintData._tasklist[i]._state=="Pending"){
                console.log("pending");
            }
            else if(sprintData._tasklist[i]._state=="Pending"){
                console.log("completed");
            }
            else{
                break;
            }
            

        }
        table += `</thead>
                </table>`
    document.getElementById("pending").innerHTML = table;
}


            