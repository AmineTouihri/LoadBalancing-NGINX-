const express=require('express')
const os= require('os')

const bodyParser= require('body-parser')

const cors=require('cors')

const {Client} =require('@elastic/elasticsearch')
const { response } = require('express')
const client=new Client({node:'http://localhost:9200'})
const app=express()

app.use(cors()) 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const document ={
    title:"hello es",
    value:"bbb bbb"
}


app.use('/tryES',async(req,res)=>{
   /* client.indices.create(
        {
            index:"testeswithnode"
        }
    ).then(res=>{
        console.log("index created !!");
        console.log(res);
    }).catch(err=>{
        console.log(err);
    }) */

   /* const response = await client.index({
        index:'testeswithnode',
        body:document
    }).then(res=>{
     //   console.log(res);
     console.log(response);

    }) */

        const response = await client.search({
          index: 'testeswithnode',
          body: {
            query: {
              exists: {
                field: 'title'
              }
            }
          }
        }).then(res=>{
            console.log(res.hits);
        });
    
        console.log('Documents found:');
      

})

app.use('/',(req,res)=>{
    console.log('im sending this response from :'+os.hostname());
    res.json({message:"ok it works..",hostname:os.hostname()})
})

app.listen(8000,()=>console.log("server running on port 3000"))