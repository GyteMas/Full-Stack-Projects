const { body } = require('express-validator');
const AppError = require('../utilities/appError');

const validateAppointment = [
    body().notEmpty().withMessage('Request body must contain data'),

    body('pet_name')
        .trim()
        .notEmpty()
        .withMessage('Pet name is required'),

    body('date')
    .optional()
        .notEmpty()
        .withMessage('Date is required')
        .isISO8601()
        .withMessage('Invalid date format'),

    body('status')
        .optional()
        .isIn(['Pending', 'Confirmed', 'Closed'])
        .withMessage('Status must be Pending, Confirmed or Closed'),

    body('rating')
        .optional()
        .isInt({ min: 1, max: 5 })
        .withMessage('Rating must be between 1 and 5'),
];

module.exports = validateAppointment;