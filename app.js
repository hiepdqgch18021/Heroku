const express = require('express');
const ObjectID = require('mongodb').ObjectId;
const app = express()

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))


// const {ObjectId,MongoClient} = require('mongodb');
// const{getDB} = require('./DBhandler')
// app.get('/',(req,res)=>{
//        res.sendFile(__dirname + '/views/view.html');
// })

app.post('/insert',async(req,res)=>{

       const nameInput = req.body.txtName;
       const tuoiInput = req.body.txtTuoi;
       const newStudent = {name: nameInput, tuoi : tuoiInput}

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
       var ObjectID = require('mongodb').ObjectId;
       const client = await MongoClient.connect(url);
       const dbo = client.db("GCH0805");
       await dbo.collection("students").deleteOne({"_id" : ObjectId(id)});
       res.redirect("/");

       // //res.render('index',{data:allStudents})
       // res.redirect("/");
       // const id= req.query.id; 
       // await deleteStudent(id);
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
       console.log('server is running : ', PORT)
});








