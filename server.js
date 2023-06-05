const express=require('express')
const os= require('os')

const app=express()

app.use('/',(req,res)=>{
    console.log('im sending this response from :'+os.hostname());
    res.json({message:"ok it works..",hostname:os.hostname()})
})

app.listen(80,()=>console.log("server running on port 3000"))