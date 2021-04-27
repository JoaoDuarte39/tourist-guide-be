const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Business = require('../models/Business');

// POST route => to create a new project
router.post('/business', (req, res, next) => {
  const { name } = req.body;
  Business.create({
    name,
    owners: [req.user._id]
  })
    .then(newBusiness => {
      res.json({ data: newBusiness });
    })
    .catch(err => {
      res.json(err);
    });
});

router.get('/business', (req, res, next) => {
  Business.find()
    .populate('monuments')
    // .populate('reviews')
    // .populate('guides')
    .populate('owners')
    .then(allTheBusiness => {
      res.json({ data: allTheBusiness });
    })
    .catch(err => {
      res.json(err);
    });
});

router.get('/business/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Business.findById(req.params.id)
    .populate('monuments', 'guides', 'owners', 'reviews')
    .then(business => {
      res.status(200).json({ data: business });
    })
    .catch(error => {
      res.json(error);
    });
});

// PUT route => to update a specific project
router.put('/business/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Business.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Business with ${req.params.id} is updated successfully.` });
    })
    .catch(error => {
      res.json(error);
    });
});

// DELETE route => to delete a specific project
router.delete('/business/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Business.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Business with ${req.params.id} is removed successfully.` });
    })
    .catch(error => {
      res.json(error);
    });
});



module.exports = router;
