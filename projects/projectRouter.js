const express = require('express');

const router = express.Router();

const ProjectDB = require('../data/helpers/projectModel');

router.use((req, res, next) => {
  console.log('>>>>>>  FROM_PROJECT_ROUTER  <<<<<<');
  next();
});

router.get('/', async (req, res) => {
  try {
    const Projects = await ProjectDB.get();
    res.status(200).json(Projects);
  } catch (err) {
    res
      .status(500)
      .json({ err: err.message, message: 'Error retrieving projects!' });
  }
});

module.exports = router;
