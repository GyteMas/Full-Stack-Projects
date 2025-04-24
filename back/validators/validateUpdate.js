const { body } = require('express-validator');
const AppError = require('../utilities/appError');
const { getUserById } = require('../models/userModel');

const validateUpdate = [
  body().notEmpty().withMessage('Request body must contain data'),

  body('pet_name')
    .optional()
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
    .withMessage('Status must be Pending, Confirmed or Closed')
    .custom(async (value, { req }) => {
      const user = await getUserById(req.user.id);
      console.log(req.body);
      
      if (user.role !== 'admin') {
        throw new AppError('You are not authorized to update this appointment');
      }else if (req.user.id !== user.id) { 
        throw new AppError('You are not authorized to update this appointment');
      }
      return true;
    }),

  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5')
    .custom(async(value, { req }) => {
      const user = await getUserById(req.user.id);
      // console.log(user.role, req.user.id);
      if (user.role !== 'admin') {
        throw new AppError('You are not authorized to update this appointment');
      }else if (req.user.id !== req.body.user.id) { 
        
        throw new AppError('You are not authorized to update this appointment');
      }
      return true;
    }),
];

module.exports = validateUpdate;
