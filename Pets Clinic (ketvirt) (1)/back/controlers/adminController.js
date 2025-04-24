const { getAllAppointmentsModel, adminUpdateAppointmentModel, adminDeleteAppointmentModel } = require('../models/adminModel');
const AppError = require('../utilities/appError');

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

// Get all appointments (Admin only)
exports.getAllAppointments = async (req, res, next) => {
    try {
     let appointments = await getAllAppointmentsModel();
            appointments = appointments.map(appointment => ({
                ...appointment,
                date: formatDate(appointment.date)
            }));
            res.status(200).json({ status: 'success', data: appointments });
    } catch (error) {
        next(error);
    }
};

// Update any appointment (Admin only)
exports.adminUpdateAppointment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { date, pet_name, status} = req.body;
        
        const appointment = await adminUpdateAppointmentModel({...req.body, id});
        if (!appointment) {
            return next(new AppError('Appointment not found', 404));
        }
        res.status(200).json({ status: 'success', data: appointment });
    } catch (error) {
        next(error);
    }
};

// Delete any appointment (Admin only)
exports.adminDeleteAppointment = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const result = await adminDeleteAppointmentModel(id);
        if (!result) {
            return next(new AppError('Appointment not found', 404));
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
