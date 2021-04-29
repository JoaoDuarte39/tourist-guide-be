const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Course = require('../models/Course');

// POST route => to create a new project
router.post('/course', (req, res, next) => {
    const { name } = req.body;
    Course.create({
        name: req.body.name,
        transportation: req.body.transportation,
    })
        .then(newCourse => {
            res.json({ data: newCourse });
        })
        .catch(err => {
            res.json(err);
        });
});

router.get('/course', (req, res, next) => {
    Course.find()
        .populate('monuments')
        //.populate('reviews')
        //.populate('guides')
        //.populate('business')
        .then(allTheCourses => {
            res.json({ data: allTheCourses });
        })
        .catch(err => {
            res.json(err);
        });
});

router.get('/course/:id', (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Course.findById(req.params.id)
        .populate('monuments')
        .then(course => {
            res.status(200).json({ data: course });
        })
        .catch(error => {
            res.json(error);
        });
});

// PUT route => to update a specific project
router.put('/course/:id', (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Course.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((updatedCourse) => {
            res.json({ data: updatedCourse });
        })
        .catch(error => {
            res.json(error);
        });
});

// DELETE route => to delete a specific project
router.delete('/course/:id', (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Course.findByIdAndRemove(req.params.id)
        .then(() => {
            res.json({ message: `Course with ${req.params.id} is removed successfully.` });
        })
        .catch(error => {
            res.json(error);
        });
});



module.exports = router;