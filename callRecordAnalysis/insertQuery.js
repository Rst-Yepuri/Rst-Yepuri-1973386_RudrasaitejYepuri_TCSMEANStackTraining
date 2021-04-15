let mongoClient = require("mongodb").MongoClient;
let fs = require("fs");
let url = "mongodb://localhost:27017"

let json = new Array();
if (fs.existsSync("./callData.json")) {
    let data = fs.readFileSync("callData.json");
    if (data.toString()) {
        json = JSON.parse(data.toString());
    }
}


mongoClient.connect(url, { useUnifiedTopology: true }, (err1, client) => {
    if (!err1) {
        for (let i = 0; i < json.length; i++) {
        let db = client.db("meanstack");
        db.collection("CallRecordAnalysis").insertOne({ _id: json[i]._id, source: json[i].source, destination: json[i].destination, sourceLocation: json[i].sourceLocation, destinationLocation: json[i].destinationLocation, callDuration: json[i].destination, roaming: json[i].roaming, callCharge: json[i].callCharge }, (err2, result) => {
            if (!err2) {
                console.log(result.insertedCount);
            } else {
                console.log(err2.message);
            }
            client.close();
        });
        }   

    }
});