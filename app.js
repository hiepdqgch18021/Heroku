const express = require('express');
const app = express()
const {ObjectId,MongoClient} = require('mongodb');
//const MongoClient = require('mongodb');
const url = 'mongodb://localhost:27017';
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))


// const {ObjectId,MongoClient} = require('mongodb');
// const{getDB} = require('./DBhandler')
// app.get('/',(req,res)=>{
//        res.sendFile(__dirname + '/views/view.html');
// })

app.post('/add',async(req,res)=>{
       const idInput =req.body.txtId;
       const nameInput = req.body.txtName;
       const priceInput = req.body.txtPrice;
       const newStudent = {ID : idInput ,Name: nameInput, Price : priceInput}

       const client = await MongoClient.connect(url);
       const dbo = client.db("GCH0805");
       await dbo.collection("students").insertOne(newStudent);
       res.redirect("/");

       //const dbo = await getDB();
//     const nameInput = req.body.txtName;
//     const tuoiInput = req.body.txtTuoi;
//     const pictureInput = req.body.txtPicture;
//     const newStudent = {name:nameInput,tuoi:tuoiInput,picture:pictureInput}
//  insertStudent(newStudent);
})
  
app.get('/delete',async (req,res)=>{
       const id  =req.query.id;
       // var ObjectID = require('mongodb').ObjectId;
       const client = await MongoClient.connect(url);
       const dbo = client.db("GCH0805");
       await dbo.collection("students").deleteOne({"_id" : ObjectId(id)});
       res.redirect("/");

       // //res.render('index',{data:allStudents})
       // res.redirect("/");
       // const id= req.query.id; 
       // await deleteStudent(id);
})

app.get('/',async (req,res)=>{
       const client = await MongoClient.connect(url);
       const dbo = client.db("GCH0805")
       
       //const dbo = await getDB(); 
       const allStudents = await dbo.collection("students").find({}).toArray();
       res.render('index',{data:allStudents})
       return dbo;
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
       console.log('server is running : ', PORT)
});








