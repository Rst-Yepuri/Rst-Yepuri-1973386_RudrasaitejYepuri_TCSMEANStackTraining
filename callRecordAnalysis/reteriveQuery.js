let mongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017";
mongoClient.connect(url,{ useUnifiedTopology: true },(err1,client)=> {
    if(!err1){
        let db = client.db("meanstack");
        let cursor = db.collection("CallRecordAnalysis").find();
            cursor.each((err2,doc)=> {
                    if(doc!=null){
                console.log(doc);
                    }
                    client.close();
            })
       
    }
})