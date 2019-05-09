var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
var session = require('express-session');
app.use(session({secret: "dmm map"}));
var csdl= require("./database/csdl")
var server = require("http").Server(app);
var io = require("socket.io")(server);
var url = require('url');
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

XuLy = async function (req, res){
  var ten= "";
  var thoat= "";
  var dk= "";
  var userId = req.session.user;
  if(userId == undefined){
     res.render("index1");
    }
  else {
    if (userId!=undefined){
      ten = req.session.user.TenDN;
      thoat = "<a href=/?thoat=1>exit</a>"
      res.render("index3",{ ten:ten,thoat:thoat});}
    };

};

app.post("/dangnhap", async function (req, res) {
  var email = req.body.email;
  var matkhau = req.body.pass;
  var record = await csdl.Login(email, matkhau);
  
  if (record == 0) {
    req.session.user = undefined;
  }
  else{
    req.session.user = record;
  }
  await XuLy(req,res);
});

app.post("/dangky", async function (req, res) {
  var tendn = req.body.username;
  var matkhau = req.body.pass;
  var email = req.body.email;
  var record = await csdl.Register(tendn, matkhau, email); 
if (record == 0) 
       res.render("index2");
    else
    res.render("index1");
});

// app.get("/index1",function(req,res){
//   res.render("index1.ejs");
// })

app.get("/index2", async function(req,res){
    res.render("index2");
});

// app.get("/index3", async function(req,res){
//   res.render("index3");
// });

app.get("/",async function(req,res){
  var q = url.parse(req.url, true).query;
  if (q.thoat == 1) req.session.user = undefined ;
  if (q.dk != undefined) 
  res.render("index2");
  else {
      await XuLy(req, res);
    }
});

server.listen(3000);