const express = require('express');
const mongoose = require('mongoose');

const Appointment = require('./models/appointments.model.js');
const appointmentRoute = require("./routes/appointments.route.js")

const Absence = require('./models/absence.model.js');
const absenceRoute = require("./routes/absence.route.js")

const app = express();

const cors = require('cors');
app.use(cors());


// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))

// routes
app.use("/api/appointments", appointmentRoute);
app.use("/api/absence", absenceRoute);


app.get('/', (req, res) => {
  res.send('Hello from node api server');
});

  






// app.get('/api/products', async (req, res) => {
//     try {
//         const products = await Product.find({});
//         res.status(200).json(products);

//     } catch (error) {
//         res.status(500).json({message: error.message});
//     }
// });


// app.get('/api/products/:id', async (req, res) => {
//     try {
//         const {id} = req.params;
//         const product = await Product.findById(id);
//         res.status(200).json(product);

//     } catch (error) {
//         res.status(500).json({message: error.message});
//     }
// });


// app.post('/api/products', async (req, res) => {
//     // console.log(req.body);
//     // res.send(req.body);

//     try {
//         const product = await Product.create(req.body);

//         // productData.date = moment(productData.date).utc().format('YYYY-MM-DD');

//         res.status(200).json(product);

//     } catch (error) {
//         res.status(500).json({message: error.message});
//     }
// });


// update
// app.put('/api/products/:id', async (req, res) => {

//     try {
//         const {id} = req.params;
//         const product = await Product.findByIdAndUpdate(id, req.body);

//         if (!product) {
//             return res.status(404).json({message: "product not found"})
//         }

//         const updatedProduct = await Product.findById(id);
//         res.status(200).json(updatedProduct);

//     } catch (error) {
//         res.status(500).json({message: error.message});
//     }
// });


// //delete 
// app.delete('/api/products/:id', async (req, res) => {

//     try {
//         const {id} = req.params;
//         const product = await Product.findByIdAndDelete(id);

//         if (!product) {
//             return res.status(404).json({message: "product not found"})
//         }

//         res.status(200).json("product deleted successfully");

//     } catch (error) {
//         res.status(500).json({message: error.message});
//     }
// });



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
