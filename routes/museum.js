const express = require('express');
const mongoose = require('mongoose');
const Museum = require('../models/Museum');
const Event = require('../models/Event');
 
const router = express.Router();
 
// GET route => to retrieve a specific task
router.get('/events/:eventId/museum/:museumId', (req, res, next) => {
  Museum.findById(req.params.taskId)
    .then(museum => {
      res.json(museum);
    })
    .catch(error => {
      res.json(error);
    });
});
 
// POST route => to create a new task
router.post('/museums', (req, res, next) => {
  Museum.create({
    title: req.body.title,
    description: req.body.description,
    event: req.body.eventID
  })
    .then(response => {
      return Event.findByIdAndUpdate(req.body.eventID, {
        $push: { museums: response._id }
      });
    })
    .then(theResponse => {
      res.json(theResponse);
    })
    .catch(err => {
      res.json(err);
    });
});
 
// PUT route => to update a specific task
router.put('/museums/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  Museum.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Museum with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    });
});
 
// DELETE route => to delete a specific task
router.delete('/museums/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  Museum.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Museum with ${req.params.id} is removed successfully.` });
    })
    .catch(error => {
      res.json(error);
    });
});
 
module.exports = router;