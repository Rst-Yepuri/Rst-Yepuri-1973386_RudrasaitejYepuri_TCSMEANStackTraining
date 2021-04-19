let app = require("express")();
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));


let mongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017"


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})
app.get("/storeCDetails",(req,res)=>{
    res.sendFile(__dirname+"/storeCDetails.html");
})
app.post("/storeCDetails",(req,res)=> {
    let courseId = req.body._id;
    let cName = req.body.courseName;
    let des = req.body.description;
    let amt = req.body.amount;
    mongoClient.connect(url, { useUnifiedTopology: true }, (err1, client) => {
        if (!err1) {
            let db = client.db("meanstack");
            db.collection("CourseDetails").insertOne({ _id: courseId, courseName: cName, description: des, amount: amt}, (err2, result) => {
                if (!err2) {
                    console.log(result.insertedCount);
                } else {
                    console.log(err2.message);
                }
                client.close();
            });
    
        }
    });
    res.sendFile(__dirname+"/index.html");
})


app.get("/updateCDetails",(req,res)=>{
    res.sendFile(__dirname+"/updateCDetails.html");
})


app.get("/deleteCDetails",(req,res)=>{
    res.sendFile(__dirname+"/deleteCDetails.html");
})

app.post("/updateCDetails",(req,res)=>{
    let courseId = req.body.cid;
    let amt = req.body.amount;

    mongoClient.connect(url,{ useUnifiedTopology: true },(err1,client)=> {
        if(!err1){
            let db = client.db("meanstack");
            db.collection("CourseDetails").updateOne({_id:courseId},{$set:{amount:amt}},(err2,result)=> {
                if(!err2){
                       if(result.modifiedCount>0){
                            console.log("Record updated successfully")
                       }else {
                            console.log("Record didn't update");
                       }
                }
                client.close();
            })           
        }
    });
    res.sendFile(__dirname+"/index.html");
});


app.post("/deleteCDetails",(req,res)=> {
    let courseId = req.body.cid;
    console.log(courseId);
    mongoClient.connect(url,{ useUnifiedTopology: true },(err1,client)=> {
        if(!err1){
            let db = client.db("meanstack");
            db.collection("CourseDetails").deleteOne({_id:courseId},(err2,result)=> {
                if(!err2){
                       if(result.deletedCount>0){
                            console.log("Record deleted successfully")  
                       }else {
                            console.log("Record not present")
                       }
    
                }
                client.close();
            });        
        }
    });
    res.sendFile(__dirname+"/index.html");
})




app.get("/fetchCDetails",(req,res)=> {                           //daat is fetched
    res.setHeader("content-type","text/html"); 
    var tdata=  `<h1>List of Courses</h1>
            <table border="1">
            <tr>
            <th>Course Id</th>
            <th>Course Name</th>
            <th>Course Description</th>
            <th>Course Price</th>`
            
    var obj=[]
    mongoClient.connect(url,{ useUnifiedTopology: true },(err1,client)=> {
      if(!err1){
       let db = client.db("meanstack");
      let cursor = db.collection("CourseDetails").find().toArray(function(err, result) {
        if (err) throw err;
        console.log("Updated");
          console.log(result.length)
          for(let i=0;i<result.length;i++){
           obj[i]=result[i]
          }
          console.log(obj)
          for(let i=0;i<obj.length;i++){
            tdata+=`<tr>
                      <td>${obj[i]._id}</td>
                      <td>${obj[i].courseName}</td>
                      <td>${obj[i].description}</td>
                      <td>${obj[i].amount}</td>
                      </tr>`
        }
        tdata+=`</table>`
        console.log("Data is fetched")
          res.send(tdata)
      });
      
     
    

}
}) 
       
})



app.listen(9090,()=>console.log("running.."));


let starthtml = `<table border="1">
            <tr>
                <th>Course ID</th>
                <th>Course Name</th>
                <th>Course Description</th>
                <th>Course Amount</th>
            </tr>
        `
let endhtml = `</table>`