const express = require('express');
const app = express()
const {ObjectId,MongoClient} = require('mongodb');
const url = "mongodb+srv://hiepdqgch18021:hiep1234@cluster0.rwpe8.mongodb.net/test";

//const MongoClient = require('mongodb');
//const url = 'mongodb://localhost:27017';
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

app.post('/add',async(req,res)=>{
       const idInput =req.body.txtId;
       const nameInput = req.body.txtName;
       const priceInput = req.body.txtPrice;
       const newStudent = {ID : idInput ,Name: nameInput, Price : priceInput}
       const client = await MongoClient.connect(url);
       const dbo = client.db("GCH0805");
       await dbo.collection("students").insertOne(newStudent);
       res.redirect("/");
})
  
app.get('/delete',async (req,res)=>{
       const id  =req.query.id;
       // var ObjectID = require('mongodb').ObjectId;
       const client = await MongoClient.connect(url);
       const dbo = client.db("GCH0805");
       await dbo.collection("students").deleteOne({"_id" : ObjectId(id)});
       res.redirect("/");

})

app.get('/',async (req,res)=>{
       const client = await MongoClient.connect(url);
       const dbo = client.db("GCH0805")      
       const allStudents = await dbo.collection("students").find({}).toArray();
       res.render('index',{data:allStudents})
       return dbo;
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
       console.log('server is running : ', PORT)
});








