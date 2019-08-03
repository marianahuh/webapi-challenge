const express = require('express');

const router = express.Router();

const ProjectDB = require('../data/helpers/projectModel');

router.use((req, res, next) => {
  console.log('>>>>>>  FROM_PROJECT_ROUTER  <<<<<<');
  next();
});

router.get('/', async (req, res) => {
  try {
    const project = await ProjectDB.get();
    res.status(200).json(project);
  } catch (err) {
    res
      .status(500)
      .json({ err: err.message, message: 'Error retrieving projects!' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const project = await ProjectDB.get(req.params.id);
    res.status(200).json(project);
  } catch (err) {
    res
      .status(500)
      .json({ err: err.message, message: 'Error retrieving projects!' });
  }
});

router.post('/', (req, res) => {
  const project = req.body;
  ProjectDB.insert(project)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json({
        error: err.message,
        message: 'Error retrieving project'
      });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  ProjectDB.update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(400).json({
          message: 'Please provide name and description for the project.'
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err.message,
        message: 'Project could not be modified.'
      });
    });
});

router.delete('/:id', async (req, res) => {
  try {
    const project = await ProjectDB.remove(req.params.id);
    res.status(204).json(project);
  } catch (err) {
    res
      .status(500)
      .json({ err: err.message, message: 'Error deleting project!' });
  }
});

router.get('/:id/actions', async (req, res) => {
  try {
    const project = await ProjectDB.getProjectActions(req.params.id);
    res.status(200).json(project);
  } catch (err) {
    res
      .status(500)
      .json({ err: err.message, message: 'Error retrieving actions!' });
  }
});

module.exports = router;
