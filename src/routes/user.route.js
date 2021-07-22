const express = require( 'express');

const controller = require( '../controllers/user.controller');

const router = express.Router();


router.post('/user', controller.post);

router.get('/user', controller.get);

router.get('/user/:id', controller.getOne);

router.put('/user/:id', controller.put);

router.delete('/user/:id', controller.remove);

module.exports = router;