const express=require('express')
const cors=require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app=express();
const port= process.env.PORT || 5000;

app.use(express.json())
app.use(cors())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.bahxlpw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run () {
    try{
        const productCollection = client.db('emaJohn').collection('products')
        app.get('/products',async(req,res)=>{
            const query= {}
            const cursor=productCollection.find(query)
            const products= await cursor.toArray()
            res.send(products)
        })
    }
    finally{

    }
}
run().catch(error=>console.error(error))



app.get('/', (req,res)=>{
res.send('ema john server is running')

})

app.listen(port,()=>{
console.log(`ema john server running in port:${port}`)
})