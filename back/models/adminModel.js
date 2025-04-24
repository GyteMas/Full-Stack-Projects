const { sql } = require('../dbConnection');

// Get all appointments (Admin only)
exports.getAllAppointmentsModel = async () => {
    return await sql`
        SELECT appointments.id, users.name AS username, appointments.pet_name, appointments.date, appointments.status, appointments.rating, appointments.description
        FROM appointments
        JOIN users ON appointments.user_id = users.id;
    `;
};

// Update any appointment (Admin only)
exports.adminUpdateAppointmentModel = async (appt) => {
        const columns = Object.keys(appt);
        const appointment = await sql`
            UPDATE appointments
            SET ${
                sql(appt, columns)
              }
            WHERE id = ${appt.id}
            RETURNING *;
        `;
        return appointment[0];
    };

// Delete any appointment (Admin only)
exports.adminDeleteAppointmentModel = async (id) => {
    const result = await sql`
        DELETE FROM appointments WHERE id = ${id} RETURNING *;
    `;
    return result[0];
};