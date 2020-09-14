const express = require('express');
const mongoose = require('mongoose');
const requierAuth = require('../middlewares/requireAuth');
const Movements = mongoose.model('Movements');

var constants = require('../models/Constants');

const router = express.Router();

// router.use(requierAuth);

router.get('/movements', requierAuth, async (req, res) => {
	try {
		const movements = await Movements.find({ userId: req.user._id });
		res.send({
			status: constants.RESPONSE_STATUS_SUCCESS,
			movements,
			error: '',
		});
	} catch (err) {
		return res.status(422).send({
			status: constants.RESPONSE_STATUS_ERROR,
			error: err.message,
		});
	}
});

router.post('/movement', requierAuth, async (req, res) => {
	try {
		const movement = new Movements(
			({ holder, reference, amount, isDebit, productId } = req.body)
		);

		movement.userId = req.user._id;

		await movement.save();
		res.send(200, movement);
	} catch (err) {
		return res.status(422).send({
			status: constants.RESPONSE_STATUS_ERROR,
			error: err.message,
		});
	}
});

module.exports = router;
