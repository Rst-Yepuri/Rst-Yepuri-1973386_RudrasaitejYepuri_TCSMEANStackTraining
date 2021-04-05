let obj = require("readline-sync");
let fs = require("fs");
const datetime = require('./date-time')


module.exports.userlogs = function(){
    let json = new Array();
    if (fs.existsSync("./user.json")) {
        let data = fs.readFileSync("user.json");
        if(data.toString()){
            json = JSON.parse(data.toString());
        }
    }
    let no_of_records = obj.question("No of records required: ");
    for(let i = 0; i<no_of_records;i++){
    let id = obj.question("enter your id: ");
    console.log("your Id is:"+id);
    let name = obj.question("enter your name: ");
    console.log("your Name is:"+name);
    let salary = obj.question("enter your salary: ");
    console.log("your salary is:"+salary);
    let gender = obj.question("enter your gender: ");
    console.log("your gender is:"+gender);
    let empObj = {"id": id,"name": name,"salary": salary, "date": datetime.dt};
    json.push(empObj);


    }
    let jsonData = JSON.stringify(json);
    fs.writeFileSync("user.json",jsonData);
    console.log("Record stored successfully...");

}









