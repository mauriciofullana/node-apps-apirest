const express = require('express');
const mongoose = require('mongoose');
const requierAuth = require('../middlewares/requireAuth');
const Products = mongoose.model('Products');

var constants = require('../models/Constants');

const router = express.Router();

// router.use(requierAuth);

router.get('/products', requierAuth, async (req, res) => {
	try {
		const products = await Products.find({ userId: req.user._id });
		res.send({
			status: constants.RESPONSE_STATUS_SUCCESS,
			products,
			error: '',
		});
	} catch (err) {
		return res.status(422).send({
			status: constants.RESPONSE_STATUS_ERROR,
			error: err.message,
		});
	}
});

router.post('/product', requierAuth, async (req, res) => {
	try {
		const product = new Products(
			({ productNumber, alias, balance, productType } = req.body)
		);

		product.userId = req.user._id;

		await product.save();
		res.send(200, product);
	} catch (err) {
		return res.status(422).send({
			status: constants.RESPONSE_STATUS_ERROR,
			error: err.message,
		});
	}
});

module.exports = router;
