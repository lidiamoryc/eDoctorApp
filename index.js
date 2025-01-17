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
app.use(express.urlencoded({ extended: false }))

// routes
app.use("/api/appointments", appointmentRoute);
app.use("/api/absence", absenceRoute);


app.get('/', (req, res) => {
    res.send('Hello from node api server');
});

mongoose.connect("mongodb+srv://piotrbledowski77:PPWaCo83To5v3A8Q@e-doctor-app.nm0w4.mongodb.net/?retryWrites=true&w=majority&appName=e-doctor-app")
    .then(() => {
        console.log("connected to database");

        app.listen(3000, () => {
            console.log('server is running on port 3000')
        });

    })
    .catch(() => {
        console.log("connection failed");
    });
