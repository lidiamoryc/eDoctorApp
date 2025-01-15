const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');

const app = express()

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello from node api server');
});


app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


app.get('/api/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


app.post('/api/products', async (req, res) => {
    // console.log(req.body);
    // res.send(req.body);

    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


mongoose.connect("mongodb+srv://admin:admin@backenddb.dxynh.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB")
.then(() => {
    console.log("connected to database");

    app.listen(3000, () => {
        console.log('server is running on port 3000')
    });

})
.catch(() => {
    console.log("connection failed");
});
