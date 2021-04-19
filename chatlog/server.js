let app = require("express")();
let http = require("http").Server(app);   // to load the library we have run port number using hhtp module 
let io = require("socket.io")(http);

app.get("/",(req,res)=> {
    res.sendFile(__dirname+"/index.html");
})

io.on("connection",(socket)=> {
    console.log("Client connected to application.....");
    
    socket.on("chat",(msg)=> {
        // console.log("\nHello "+msg.Name+"\n");
        // console.log(msg.Message);
        let mongoClient = require("mongodb").MongoClient;
        let url = "mongodb://localhost:27017"

        mongoClient.connect(url, { useUnifiedTopology: true }, (err1, client) => {
            if (!err1) {
                let db = client.db("meanstack");
                db.collection("Messages").insertOne({SendersName: msg.Name, SendersMessage: msg.Message}, (err2, result) => {
                    if (!err2) {
                        console.log(result.insertedCount);
                    } else {
                        console.log(err2.message);
                    }
                    client.close();
                });
        
            }
        });
    })
})
http.listen(9090,()=>console.log('server running on port number 9090'));