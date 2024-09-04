const Feedback = require('../models/feedback.model');
const Course = require('../models/course.model');
const Trainer = require('../models/trainer.model');

// Function to create feedback
async function createFeedback(req, res) {
    const { studentId, courseId, trainerId, rating, comment } = req.body;

    if (!studentId || !courseId || !trainerId || !rating) {
        return res.status(400).json({ message: 'All fields (studentId, courseId, trainerId, rating) are required.' });
    }

    try {
        // Check if the course and trainer exist
        const course = await Course.findByPk(courseId);
        const trainer = await Trainer.findByPk(trainerId);

        if (!course || !trainer) {
            return res.status(404).json({ message: 'Course or Trainer not found.' });
        }

        const feedback = await Feedback.create({
            studentId,
            courseId,
            trainerId,
            rating,
            comment
        });

        res.status(201).json(feedback);
    } catch (error) {
        res.status(500).json({ message: `Error saving feedback: ${error.message}` });
    }
}

// Function to get feedback for a specific course
async function getFeedbacksForCourse(req, res) {
    const { courseId } = req.params;

    try {
        const feedbacks = await Feedback.findAll({
            where: { courseId },
            include: [Course, Trainer]
        });
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: `Error retrieving feedback for course: ${error.message}` });
    }
}

// Function to get feedback for a specific trainer
async function getFeedbacksForTrainer(req, res) {
    const { trainerId } = req.params;

    try {
        const feedbacks = await Feedback.findAll({
            where: { trainerId },
            include: [Course, Trainer]
        });
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: `Error retrieving feedback for trainer: ${error.message}` });
    }
}

module.exports = {
    createFeedback,
    getFeedbacksForCourse,
    getFeedbacksForTrainer
};
