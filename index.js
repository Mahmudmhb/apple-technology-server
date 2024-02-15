const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
app.use(cors())
app.use(express.json())

// kU07FWJdJ2dPGPLy
// technoloy-phone




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://technoloy-phone:kU07FWJdJ2dPGPLy@cluster0.gegfn.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const categoryCollection = client.db("AppleDB").collection('category')
    const productsCollection = client.db('AppleDB').collection('addProducts')
    const addToCartCollection = client.db('AppleDB').collection('cartContainer')


    app.post('/addtoCart', async(req, res)=>{
      const addCart = req.body
      // console.log('hittig body',addtoCart)
      const cart = await addToCartCollection.insertOne(addCart)
      res.send(cart)
    })

    app.get('/addtoCart', async (req, res)=>{
      const totalAddtoCart = await addToCartCollection.find().toArray()
      res.send(totalAddtoCart)
    })
    app.get('/addtoCart/:id', async(req, res)=>{
      const id = req.params.id
      console.log('finding data', id)
      const data = { _id: (id)}
      console.log('need data', data)
      const result = await addToCartCollection.findOne(data)
      console.log(result)
      res.send(result)


     
    })
    app.delete('/addtoCart/:id', async(req, res)=>{
      const id = req.params.id;
      // console.log(id)
      const query  = {_id: (id)}
      const result = await addToCartCollection.deleteOne(query )
      res.send(result)
      console.log(result)
    })
app.get('/products', async(req, res)=>{
    const cursor = await productsCollection.find().toArray()
    res.send(cursor)

})
app.get('/products/:id', async(req, res)=>{
  const id = req.params.id
  // console.log(id)
  const query = { _id: new ObjectId(id)}
   const product = await productsCollection.findOne(query)
   console.log(product)
   res.send(product)
})
    app.post('/products', async(req, res)=>{
        const products = req.body;
        console.log(products)
        const result = await productsCollection.insertOne(products)
        res.send(result)
    })

app.post('/category', async(req, res)=>{
    const category = req.body
    console.log(category)
})


  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res)=>{
    console.log('hittng the server');
    res.send('this is server site')
})

app.listen(port, ()=>{
    console.log(`this is listening port of ${port}`)
})