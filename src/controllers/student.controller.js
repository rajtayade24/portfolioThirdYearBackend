import { studentSchema } from "../validators/student.schema.js";
import * as studentService from "../services/student.service.js";

async function createNewStudent(req, res) {
  const parsedBody = studentSchema.parse(req.body);
  const createdStudent = await studentService.createNewStudent(parsedBody);

  return res.status(201).json(createdStudent);
}

async function getStudents(req, res) {
  const students = await studentService.getAllStudents();
  return res.status(200).json(students);
}

async function getStudentDto(req, res) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    throw new AppError("Invalid student id", 400);
  }
  const student = await studentService.getStudentById(id);
  return res.status(200).json(student);
}

async function updateStudent(req, res) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    throw new AppError("Invalid student id", 400);
  }
  const parsedBody = studentSchema.partial().parse(req.body);
  const updatedStudent = await studentService.updateStudent(id, parsedBody);

  return res.status(200).json(updatedStudent);
}

async function deleteStudent(req, res) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    throw new AppError("Invalid student id", 400);
  }
  await studentService.deleteStudentById(id);
  return res.status(204).send();
}

export {
  createNewStudent,
  getStudents,
  getStudentDto,
  updateStudent,
  deleteStudent
};