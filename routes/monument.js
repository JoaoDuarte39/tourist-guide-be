const express = require('express');
const mongoose = require('mongoose');
const Monument = require('../models/Monument');
const Business = require('../models/Business');

const router = express.Router();

// GET route => to retrieve a specific task
router.get('/monuments/:monumentId', (req, res, next) => {
  Monument.findById(req.params.monumentId)
    .then(monument => {
      res.json({ data: monument });
    })
    .catch(error => {
      res.json(error);
    });
});

// POST route => to create a new task
router.post('/monuments', (req, res, next) => {
  Monument.create({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image
  })
    .then(newMonument => {
      res.json({ data: newMonument });
    })
    .catch(err => {
      res.json(err);
    });
});

// PUT route => to update a specific task
router.put('/monuments/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Monument.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedMonument) => {
      res.json({ data: updatedMonument });
    })
    .catch(err => {
      res.json(err);
    });
});

// DELETE route => to delete a specific task
router.delete('/monuments/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Monument.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Monument with ${req.params.id} is removed successfully.` });
    })
    .catch(error => {
      res.json(error);
    });
});

module.exports = router;