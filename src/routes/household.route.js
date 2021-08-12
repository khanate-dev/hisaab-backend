const express = require( 'express');

const controller = require( '../controllers/household.controller');

const router = express.Router();


router.post('/', controller.post);

router.get('/:id', controller.getOne);

router.get('/', controller.get);

router.put('/:id', controller.put);

router.delete('/:id', controller.remove);

router.put('regenerateInviteCode/:id', controller.regenerateInviteCode);

module.exports = router;