const express = require('express');
const router = express.Router();
const controller = require('../controllers/supplier');

router.post('/', controller.create);
router.get('/', controller.retrieveAll);
router.get('/:id', controller.retriveOne);
router.put('/:id', controller.updateOne);
router.delete('/:id', controller.delete);

module.exports = router;