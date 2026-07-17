import pool from "../config/db.js";
import AppError from "../utils/AppError.js";

function mapRow(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    subject: row.subject,
    message: row.message,
    mobileNumber: row.mobile_number ? Number(row.mobile_number) : null,
    rating: row.rating
  };
}

async function createNewStudent(data) {
  const { name, email, subject, message, mobileNumber, rating } = data;

  const result = await pool.query(
    `INSERT INTO students (name, email, subject, message, mobile_number, rating)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [name, email, subject || "", message || "", mobileNumber || null, rating]
  );

  return mapRow(result.rows[0]);
}

async function getAllStudents() {
  const result = await pool.query("SELECT * FROM students ORDER BY id DESC");
  return result.rows.map(mapRow);
}

async function getStudentById(id) {
  const result = await pool.query("SELECT * FROM students WHERE id = $1", [id]);

  if (result.rows.length === 0) {
    throw new AppError(`Student not found with id ${id}`, 404);
  }

  return mapRow(result.rows[0]);
}

async function updateStudent(id, data) {
  const existing = await pool.query("SELECT * FROM students WHERE id = $1", [id]);

  if (existing.rows.length === 0) {
    throw new AppError(`Student not found with id ${id}`, 404);
  }

  const current = existing.rows[0];

  const updatedName = data.name ?? current.name;
  const updatedEmail = data.email ?? current.email;
  const updatedSubject = data.subject ?? current.subject;
  const updatedMessage = data.message ?? current.message;

  const updatedMobileNumber =
    data.mobileNumber !== undefined && data.mobileNumber !== null
      ? data.mobileNumber
      : current.mobile_number;

  const updatedRating = data.rating ?? current.rating;

  const result = await pool.query(
    `UPDATE students
     SET name = $1, email = $2, subject = $3, message = $4, mobile_number = $5, rating = $6
     WHERE id = $7
     RETURNING *`,
    [
      updatedName,
      updatedEmail,
      updatedSubject,
      updatedMessage,
      updatedMobileNumber,
      updatedRating,
      id
    ]
  );

  return mapRow(result.rows[0]);
}

async function deleteStudentById(id) {
  const existing = await pool.query("SELECT id FROM students WHERE id = $1", [id]);

  if (existing.rows.length === 0) {
    throw new AppError(`student does not exist by id ${id}`, 404);
  }

  await pool.query("DELETE FROM students WHERE id = $1", [id]);
}

export {
  createNewStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudentById
};