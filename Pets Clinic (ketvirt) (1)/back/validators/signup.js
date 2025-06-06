const { body } = require('express-validator');
const { getUserByEmail } = require('../models/userModel');

const validateNewUser = [
    // Check if body is not empty
    body().notEmpty().withMessage('User body must contain data'),

    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email is invalid')
        .normalizeEmail({gmail_remove_dots: false })
        .custom(async (value) => {
            const user = await getUserByEmail(value);
            if (user) {
                throw new Error('User with this email already exists');
            }
            return true; // Validation passed
        }),

    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required'),

    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters')
        // .isStrongPassword() 
        // .withMessage('Password must be at least 8 characters, a lowercase and uppercase letter, a symbol and a number')
        .custom((value, { req }) => {
            if (value !== req.body.passwordconfirm) {
                throw new Error('Password and password confirm do not match');
            }
            return true;
        })
];

module.exports = validateNewUser;
