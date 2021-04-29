const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Guide = require('../models/Guide');

// POST route => to create a new project
router.post('/guide', (req, res, next) => {
    console.log(req.body)
    Guide.create({
        name: req.body.name,
        image: req.body.image,
        owner: req.user._id
    })
        .then(newGuide => {
            res.json({ data: newGuide });
        })
        .catch(err => {
            res.json(err);
        });
});

router.get('/guide', (req, res, next) => {
    Guide.find()
        .populate('monuments')
        // .populate('reviews')      
        //.populate('courses')
        .then(allTheGuides => {
            res.json({ data: allTheGuides });
        })
        .catch(err => {
            res.json(err);
        });
});

router.get('/guide/:id', (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Guide.findById(req.params.id)
        .populate('monuments')
        .then(guide => {
            res.status(200).json({ data: guide });
        })
        .catch(error => {
            res.json(error);
        });
});

// PUT route => to update a specific project
router.put('/guide/:id', (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Guide.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((updatedGuide) => {
            res.json({ data: updatedGuide });
        })
        .catch(error => {
            res.json(error);
        });
});

// DELETE route => to delete a specific project
router.delete('/guide/:id', (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Guide.findByIdAndRemove(req.params.id)
        .then(() => {
            res.json({ message: `Guide with ${req.params.id} is removed successfully.` });
        })
        .catch(error => {
            res.json(error);
        });
});



module.exports = router;