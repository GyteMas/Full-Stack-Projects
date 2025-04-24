// routes/appointmentsRouter.js

const express = require('express');
const {
    createAppointment,
    getUserAppointments,
    updateAppointment,
    deleteAppointment
} = require('../controlers/appointmentsController');
const { protect } = require('../controlers/authControler');
const validateAppointment = require('../validators/validateAppointment');
const validateUpdate = require('../validators/validateUpdate');
const validate = require('../validators/validate');

const router = express.Router();

router.route('/')
    .post(protect, validateAppointment, validate, createAppointment)
    .get(protect, getUserAppointments);

router.route('/:id')
// protect, validateUpdate, validate, 
    .patch(protect, validate,validateUpdate, updateAppointment)
    .delete(protect,validateUpdate, validate, deleteAppointment);

module.exports = router;
