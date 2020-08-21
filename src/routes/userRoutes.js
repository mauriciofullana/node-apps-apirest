const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const _ = require('underscore');

var constants = require('../models/Constants');

const router = express.Router();

router.put('/user/:id', async (req, res) => {
	let id = req.params.id;
	let body = _.pick(req.body, ['name', 'lastName', 'email', 'userName']);

	try {
		User.findByIdAndUpdate(
			id,
			body,
			{ new: true, runValidators: true },
			(error, user) => {
				if (error) {
					return res.status(422).send({
						status: constants.RESPONSE_STATUS_ERROR,
						error,
					});
				}
				user.password = null;
				res.send({
					status: constants.RESPONSE_STATUS_SUCCESS,
					user,
				});
			}
		);
	} catch (error) {
		return res.status(400).send({
			status: constants.RESPONSE_STATUS_ERROR,
			error,
		});
	}
});

module.exports = router;
