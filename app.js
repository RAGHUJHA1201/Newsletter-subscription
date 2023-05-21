const express= require("express")
const bodyParser= require("body-parser")
const https = require('https');

const app=express()
app.use(express.static("static"))
app.use(bodyParser.urlencoded({extended:true}))


app.get("/", function(req, res){
 res.sendFile(__dirname+"/signup.html")
})

app.post("/", function(req, res){
    var fname= req.body.fname;
    var lname= req.body.lname;
    var email= req.body.email

      //console.log(fname, lname, email);
      //console.log(req.body.fname, req.body.lname, req.body.email);
     //  res.send("Form submitted successfully!"); 

  const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: fname,
	            LNAME: lname,
            }
        }]
             };
const jsonData= JSON.stringify(data);
const url= "https://us13.api.mailchimp.com/3.0/lists/b4618fe926?apikey=bc9a64c66f37a907b63643f8bf8439d6-us13"
const options={

    method :"POST",
    auth: "raghu:bc9a64c66f37a907b63643f8bf8439d6-us13"
                 

}
const request= https.request(url, options, function(response){

    if(response.statusCode===200){
      
      res.sendFile(__dirname+"/success.html")
    }

    else
     {
        res.sendFile(__dirname+"/failure.html")
      }
    response.on("data", function(data){
        console.log(JSON.parse(data))
    })
})
request.write(jsonData);
request.end();


app.post("/invalid", function(req, res){
    res.sendFile(__dirname+"/signup.html")
})

})
app.listen(process.env.PORT||3000,function(){
console.log("server is on");
})


//bc9a64c66f37a907b63643f8bf8439d6-us13

//b4618fe926