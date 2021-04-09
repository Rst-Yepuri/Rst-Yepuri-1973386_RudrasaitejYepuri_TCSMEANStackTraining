let http = require("http");
let url = require("url");
let fs = require("fs");
let port = 9999;
// create array Task array 

let loginInfo = `
    <h1 style="text-align:center">Task Planner</h1>
    <h2 style="text-decoration:underline">Add Task</h2>
    <form action="/store">
    <label>EMP ID:</label> 
    <input type="text" name="empID"><br/>
    <label>Task ID:</label> 
    <input type="text" name="taskID"><br/>
    <label>Task: </label>
    <input type="text" name="taskName"><br/>
    <label>Deadline</label>
    <input type="date" name="deadlineDate"><br/>
    <input type="submit" value="ADD TASK">
    <input type="reset" value="RESET">
    </form>

    <h2 style="text-decoration:underline">Delete Task</h2>
    <form action="/delete">
    <label>Task ID:</label> 
    <input type="text" name="taskID"><br/>
    <input type="submit" value="DELETE TASK">
    </form>

    <h2 style="text-decoration:underline">Display Tasks</h2>
    <form action="/display">
    <input type="submit" value="LIST ALL TASKS">
    </form>

`

let server = http.createServer((req, res) => {
    console.log(req.url)
    var pathInfo = url.parse(req.url, true).pathname;
    if (req.url == "/") {
        res.setHeader("content-type", "text/html");  // by default data consider as a html 
        res.end(loginInfo);
    }
    else if (pathInfo == "/store") {
        let data = url.parse(req.url, true).query;
        let empid = data.empID;
        let taskid = data.taskID;
        let taskname = data.taskName;
        let deadlinedate = data.deadlineDate;
        let taskObj = {"empId": empid,"taskId": taskid,"taskName": taskname, "deadlinedDate": deadlinedate};
        let json = new Array();
        if (fs.existsSync("./task.json")) {
            let data = fs.readFileSync("task.json");
            if(data.toString()){
                json = JSON.parse(data.toString());
            }
        }
        json.push(taskObj);
        let jsonData = JSON.stringify(json);
        fs.writeFileSync("task.json",jsonData);
        res.setHeader("content-type", "text/html");
        res.end(loginInfo);
    } else if (pathInfo == "/delete") {
        let data = url.parse(req.url, true).query;
        let taskid = data.taskID;
        let json = new Array();
        if (fs.existsSync("./task.json")) {
            let data = fs.readFileSync("task.json");
            if(data.toString()){
                json = JSON.parse(data.toString());
            }
        }

        for(let i = 0;i<json.length; i++){
            if(parseInt(taskid) == parseInt(json[i].taskId)){
                json.splice(i,1);
                break;
            }
        }
        // if(i == json.length){
        //     console.log('no id');   
        // }
        let jsonData = JSON.stringify(json);
        fs.writeFileSync("task.json",jsonData);
        res.setHeader("content-type", "text/html");
        res.end(loginInfo);

    } else if (pathInfo == "/display") {

        let json = new Array();
        if (fs.existsSync("./task.json")) {
            let data = fs.readFileSync("task.json");
            if(data.toString()){
                json = JSON.parse(data.toString());
            }
        }
        let tableDatavariable = 
        `<table border="1">
            <tr>
                <th>Employee ID</th>
                <th>Task ID</th>
                <th>Task Name ID</th>
                <th>Deadline Date ID</th>
            </tr>
        `
        for(let i =0;i<json.length;i++){
            let element = json[i];
            tableDatavariable += `
                <tr>
                    <td>${element.empId}</td>
                    <td>${element.taskId}</td>
                    <td>${element.taskName}</td>
                    <td>${element.deadlinedDate}</td> 
                </tr>
            `
        }
        tableDatavariable += `</table>`
        res.end(tableDatavariable);

    }

});

server.listen(port, () => console.log(`Server running on port number ${port}`));
