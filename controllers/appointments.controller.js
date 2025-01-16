const Appointment = require('../models/appointments.model');


const getAppointments = async (req, res) => {
    try {
        const products = await Appointment.find({});
        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


const getAppointment = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Appointment.findById(id);
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};



const postAppointment = async (req, res) => {

    try {
        const product = await Appointment.create(req.body);

        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


const putAppointment = async (req, res) => {

    try {
        const {id} = req.params;
        const product = await Appointment.findByIdAndUpdate(id, req.body);

        if (!product) {
            return res.status(404).json({message: "product not found"})
        }

        const updatedProduct = await Appointment.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


const deleteAppointment = async (req, res) => {

    try {
        const {id} = req.params;
        const product = await Appointment.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({message: "product not found"})
        }

        res.status(200).json("product deleted successfully");

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


module.exports = {
    getAppointments,
    getAppointment,
    postAppointment,
    putAppointment,
    deleteAppointment,
};