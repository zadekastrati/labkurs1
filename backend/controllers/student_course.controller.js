const StudentCourse = require('../models/student_course.model.js');
const Course = require('../models/course.model.js');

// Create a new course for student
async function registerStudent(req, res) {
  try {
    const { student_id, course_id, grade } = req.body;

    const studentCourse = await StudentCourse.create({ student_id, course_id, grade });

    res.status(201).json(studentCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
exports.registerStudent = registerStudent;

// Retrieve all student courses
async function getAllStudentCourses(req, res) {
  try {
    // Find all student courses associated with the given student_id
    const studentCourses = await StudentCourse.findAll({
      where: { student_id: req.params.student_id },
    });

    // Fetch associated courses for each student course
    const studentCoursesWithCourses = await Promise.all(
      studentCourses.map(async (studentCourse) => {
        const course = await Course.findOne({
          where: { id: studentCourse.course_id },
        });
        return { ...studentCourse.toJSON(), course };
      })
    );

    res.status(200).json(studentCoursesWithCourses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
exports.getAllStudentCourses = getAllStudentCourses;

// Retrieve a single student by id
// async function getStudentById(req, res) {
//   const id = req.params.id;
//   try {
//     const student = await Student.findByPk(id);
//     if (!student) {
//       res.status(404).json({ message: `Student with id ${id} not found` });
//     } else {
//       res.status(200).json(student);
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// }
// exports.getStudentById = getStudentById;

// // Update a student by id
// async function updateStudent(req, res) {
//   const id = req.params.id;
//   try {
//     const [updatedRowsCount, updatedRows] = await Student.update(req.body, {
//       where: { id },
//       returning: true,
//     });
//     if (updatedRowsCount === 0) {
//       res.status(404).json({ message: `Student with id ${id} not found` });
//     } else {
//       res.status(200).json(updatedRows[0]);
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// }
// exports.updateStudent = updateStudent;

// // Delete a student by id
// async function deleteStudent(req, res) {
//   const id = req.params.id;
//   try {
//     const deletedRowCount = await Student.destroy({ where: { id } });
//     if (deletedRowCount === 0) {
//       res.status(404).json({ message: `Student with id ${id} not found` });
//     } else {
//       res.status(204).send();
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// }
// exports.deleteStudent = deleteStudent;
