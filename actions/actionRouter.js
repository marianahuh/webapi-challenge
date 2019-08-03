const express = require('express');

const router = express.Router();

const ActionsDb = require('../data/helpers/actionModel');

router.use((req, res, next) => {
  console.log('>>>>>>  FROM_ACTION_ROUTER  <<<<<<');
  next();
});

router.get('/', async (req, res) => {
  try {
    const Actions = await ActionsDb.get();
    res.status(200).json(Actions);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const Actions = await ActionsDb.get(req.params.id);
    res.status(200).json(Actions);
  } catch (err) {
    res
      .status(500)
      .json({ err: err.message, message: 'Error retrieving action!' });
  }
});

router.post('/', (req, res) => {
  const Actions = req.body;
  ActionsDb.insert(Actions)
    .then(Actions => {
      res.status(201).json(Actions);
    })
    .catch(err => {
      res.status(500).json({
        error: err.message,
        message: 'Error getting actions!'
      });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  ActionsDb.update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(400).json({
          message: 'Please provide name and description for the action.'
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: 'The action information could not be modified.'
      });
    });
});

router.delete('/:id', async (req, res) => {
  try {
    const Actions = await ActionsDb.remove(req.params.id);
    res.status(204).json(Actions);
  } catch (err) {
    res
      .status(500)
      .json({ err: err.message, message: 'Error deleting action' });
  }
});

module.exports = router;
