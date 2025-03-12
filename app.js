const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    const firstname = req.body.fname;
    const secondname = req.body.sname;
    const email = req.body.email;

    const data = {
        members: [
            {
                 email_address: email,
                 status: "subscribed",
                 merge_fields: {
                     FNAME: firstname,
                     LNAME: secondname
                 }
            }
        ]
    };
    
    var jsonData = JSON.stringify(data);

    const url = "https://us7.api.mailchimp.com/3.0/lists/222b93525d";

    const options = {
        method: "post",
        auth: "ayush1:5ae9bfac9a6a7b7ac8e2befadbcdd156-us7"
    };

    const request = https.request(url, options, function(response){

        if(response.statusCode===200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        });   
    });
    // request.write(jsonData);
    request.end();
});

app.listen(3000, function(){
    console.log("serer is running on port 3000");
});

app.post("/failure", function(req, res){
    res.redirect("/");
});


// API KEY
// 5ae9bfac9a6a7b7ac8e2befadbcdd156-us7

// List Id
// 222b93525d