const { sql } = require('../dbConnection');

// Create a new user
exports.createUser = async (newUser) => {
    return await sql`
        INSERT INTO users (name, email, password, role)
        VALUES (${newUser.name}, ${newUser.email}, ${newUser.password}, ${newUser.role})
        RETURNING *;
    `;
};

// Get user by email
exports.getUserByEmail = async (email) => {
    const users = await sql`
        SELECT * FROM users WHERE email = ${email} LIMIT 1;
    `;
    return users[0];
};

// Get user by ID
exports.getUserById = async (id) => {
    const users = await sql`
        SELECT * FROM users WHERE id = ${id} LIMIT 1;
    `;
    return users[0];
};
exports.getAllUsers = async () => {
    const users = await sql`
        SELECT * FROM users;
    `;
    return users;
};