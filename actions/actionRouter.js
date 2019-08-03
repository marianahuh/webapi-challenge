const express = require('express');

const router = express.Router();

const ActionsDb = require('../data/helpers/actionModel');
const ProjectsDB = require('../data/helpers/projectModel');

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

module.exports = router;
