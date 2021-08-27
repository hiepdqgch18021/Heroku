const express = require('express');
const app = express()
const {ObjectId,MongoClient} = require('mongodb');
const url = "mongodb+srv://hiepdqgch18021:hiep1234@cluster0.rwpe8.mongodb.net/test";
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.post('/add',async(req,res)=>{
       const quantityInput = req.body.txtQuantity;
       const nameInput = req.body.txtName;
       const priceInput = req.body.txtPrice;
       const newProduct = {Name: nameInput, Price : priceInput, Quantity : quantityInput}
       const client = await MongoClient.connect(url);
       const dbo = client.db("AsmDB2");
       await dbo.collection("Asm").insertOne(newProduct);
       res.redirect("/");
})
  
app.get('/delete',async (req,res)=>{
       const id  =req.query.id;
       const client = await MongoClient.connect(url);
       const dbo = client.db("AsmDB2");
       await dbo.collection("Asm").deleteOne({"_id" : ObjectId(id)});
       res.redirect("/");
})
app.post('/search',async (req,res)=>{
        const searchInput = req.body.txtSearch;
        const client = await MongoClient.connect(url);
        const dbo = client.db("AsmDB2");
        const allProducts = await dbo.collection("Asm").find({Name : searchInput}).toArray();
        res.render('index',{data:allProducts})
})
app.get('/',async (req,res)=>{
       const client = await MongoClient.connect(url);
       const dbo = client.db("AsmDB2")      
       const allProducts = await dbo.collection("Asm").find({}).toArray();
       res.render('index',{data:allProducts})
       return dbo;
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
       console.log('server is running : ', PORT)
});








