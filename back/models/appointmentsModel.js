const { sql } = require('../dbConnection');

// Create a new appointment
exports.createAppointmentModel = async (user_id, pet_name, date,description, status = 'Pending') => {
    const appointment = await sql`
        INSERT INTO appointments (user_id, pet_name, date, description)
        VALUES (${user_id}, ${pet_name}, ${date}, ${description})
        RETURNING *;
    `;
    return appointment[0];
};

// Get all appointments for a specific user
exports.getUserAppointmentsModel = async (user_id) => {
    return await sql`
        SELECT appointments.id, appointments.pet_name, appointments.date, appointments.status, appointments.rating, appointments.description, users.name AS username 
        FROM appointments 
        JOIN users ON appointments.user_id = users.id
        WHERE appointments.user_id = ${user_id};
    `;
};

// Update an appointment (only if it belongs to the user)
exports.updateAppointmentModel = async (appt) => {
    const columns = Object.keys(appt);
    const appointment = await sql`
        UPDATE appointments
        SET ${
            sql(appt, columns)
          }
        WHERE id = ${appt.id} AND user_id = ${appt.user_id}
        RETURNING *;
    `;
    return appointment[0];
};

// Delete an appointment (only if it belongs to the user)
exports.deleteAppointmentModel = async (id) => {
    const result = await sql`
        DELETE FROM appointments WHERE id = ${id}  RETURNING *;
    `;
    return result[0];
};
