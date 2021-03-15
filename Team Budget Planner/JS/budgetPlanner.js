
function resetData() {
    document.getElementById("clientName").value = "";
    document.getElementById("projectName").value = "";
    document.getElementById("projectBudget").value = "";
}


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function insertNewRecord(data) {
    var table = document.getElementById("projectBudgets")
    var body = table.getElementsByTagName("tbody")[0];
    var newRow = body.insertRow(body.length);  // row created 

    var cell1 = newRow.insertCell(0);          // cell created 
    cell1.innerHTML = data.clientName;                 // value placed 

    var cell2 = newRow.insertCell(1);          // cell created 
    cell2.innerHTML = data.projectName;                 // value placed

    var cell3 = newRow.insertCell(2);          // cell created 
    cell3.innerHTML = "$" + numberWithCommas(data.projectBudget);
}




function onFormSubmit(){

    var newProject = new Object();

    newProject .clientName = document.getElementById('clientName').value;
    newProject .projectName = document.getElementById('projectName').value;
    newProject .projectBudget = document.getElementById('projectBudget').value;

    if(sessionStorage.project)
    {
     project= JSON.parse(sessionStorage.getItem('project'));
    }else{
     project=[];
    }
    project.push(newProject )
    sessionStorage.setItem('project', JSON.stringify(project));
    resetData();


}


function reteriveInSession(){
    var total = 0;
    var retrievedObject = sessionStorage.getItem('project');
    console.log('retrievedObject: ', JSON.parse(retrievedObject));
    var result = JSON.parse(retrievedObject);
    for (i = 0; i <result.length; i++) {
        console.log(result[i]);
        console.log(result[i].projectBudget);
        total += parseInt(result[i].projectBudget);
        insertNewRecord(result[i]);
        
        
    }
    return total;
}