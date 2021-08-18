
const express = require('express')
const app = express()
app.get('/',(req,res)=>{
       res.sendFile(__dirname + '/views/Asm.hbs');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
       console.log('server is running : ', PORT)
});








