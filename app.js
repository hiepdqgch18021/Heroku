const { Console } = require('console');
const express = require('express')
const app = express()
app.checkout('/',(req,res)=>{
       res.sendFile(__dirname + '/views/index.html');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log('server is running : ', PORT)







