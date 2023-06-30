const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https =require("https");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/signup.html");
})
app.post('/',(req,res)=>{
    const FName=(req.body.FirstName);
    const Lname=(req.body.LastName);
    const ename=(req.body.email);
    
    const data ={
        members:[
            {
                email_address:ename,
                status:"subscribed",
                merge_fields:{
                    FNAME:FName,
                    LNAME:Lname,
                }
            }
        ]
    };
    const JsonData=JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/37b783960c"
    const options={
        method:'POST',
        auth:'anjali1:90bb4b4335772353dbca3c5c6f3afb9f-us21'
    }
    const request=https.request(url,options,function(response){
    if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html");
    }else{
        res.sendFile(__dirname+"/failure.html");
    }




    response.on("data",function(data){
        console.log(JSON.parse(data));
    })
    })
     request.write(JsonData);
     request.end();
});
app.post("/failure",(req,res)=>{
    res.redirect("/");
});
app.listen(process.env.PORT||3000,function(){
    console.log("server is running on the port 3000");

})
// api key mailchimp
//90bb4b4335772353dbca3c5c6f3afb9f-us21
//list id 
//37b783960c