// controllers/appointmentsController.js

const { createAppointmentModel, getUserAppointmentsModel, updateAppointmentModel, deleteAppointmentModel } = require('../models/appointmentsModel');
const AppError = require('../utilities/appError');

// Format date to 'YYYY-MM-DD HH:mm' as plain text (no conversions)
const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleString('lt-LT', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
};  

// Create a new appointment
exports.createAppointment = async (req, res, next) => {
    try {
        const { pet_name, date, description } = req.body;
        const user_id = req.user.id;
        const appointment = await createAppointmentModel(user_id, pet_name, date, description); // Save exactly as input
        appointment.date = formatDate(appointment.date);
        res.status(201).json({ status: 'success', data: appointment });
    } catch (error) {
        next(error);
    }
};

// Get all appointments for logged-in user
exports.getUserAppointments = async (req, res, next) => {
    try {
        const user_id = req.user.id;
        let appointments = await getUserAppointmentsModel(user_id);
        appointments = appointments.map(appointment => ({
            ...appointment,
            date: formatDate(appointment.date)
        }));
        res.status(200).json({ status: 'success', data: appointments });
    } catch (error) {
        next(error);
    }
};

// Update appointment (only owner can update)
exports.updateAppointment = async (req, res, next) => {
    try {
        
        const { id }= req.params;
        const user_id = req.user.id;
        

        const appointment = await updateAppointmentModel({...req.body, id, user_id});
        if (!appointment) {
            return next(new AppError('No appointment found or unauthorized', 404));
        }
        appointment.date = formatDate(appointment.date);
        res.status(200).json({ status: 'success', data: appointment });
    } catch (error) {
        next(error);
    }
};

// Delete appointment (only owner can delete)
exports.deleteAppointment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await deleteAppointmentModel(id);
        if (!result) {
            return next(new AppError('No appointment found or unauthorized', 404));
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

