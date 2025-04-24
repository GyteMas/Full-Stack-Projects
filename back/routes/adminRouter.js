const express = require('express');
const {
    getAllAppointments,
    adminUpdateAppointment,
    adminDeleteAppointment
} = require('../controlers/adminController');
const { protect, allowAccessTo } = require('../controlers/authControler');
const validateUpdate = require('../validators/validateUpdate');
const validate = require('../validators/validate');

const router = express.Router();

// Admin routes - only accessible by admins
router.route('/appointments')
    .get(protect, allowAccessTo('admin'), getAllAppointments);

router.route('/appointments/:id')
    .patch(protect, allowAccessTo('admin'), validateUpdate, validate, adminUpdateAppointment)
    .delete(protect, allowAccessTo('admin'),validateUpdate, validate, adminDeleteAppointment);

module.exports = router;