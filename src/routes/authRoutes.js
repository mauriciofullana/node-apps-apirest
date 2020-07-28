const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

var constants = require('../models/Constants');

const router = express.Router();

router.post('/signup', async (req, res) => {
    
    try {
        const user = new User({ 
            name, 
            lastName, 
            email, 
            userName,
            password
        } = req.body);

        await user.save();
    
        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
        delete user.password;
        res.send({
            status: constants.RESPONSE_STATUS_SUCCESS,
            user,
            token,
            error: ""
        });
    } catch (err) {
        return res.status(422).send({
            status: constants.RESPONSE_STATUS_ERROR,
            error: err.message
        });
    }
});

router.post('/signin', async (req, res) => {
    
    try {
        const { userName, password } = req.body;

        if (!userName || !password) {
            return res.status(422).send({
                status: constants.RESPONSE_STATUS_ERROR,
                error: constants.AUTH_RESPONSE.ERROR_INVALID_CREDENTIALS
            });
        }

        const user = await User.findOne({ userName });
        if (!user) {
            return res.send({
                status: constants.RESPONSE_STATUS_ERROR,
                error: constants.AUTH_RESPONSE.ERROR_INVALID_CREDENTIALS
            });
        }

        try {
            await user.comparePasswords(password);
            const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
            user.password = null;
            console.log(user);
            res.send({
                status: constants.RESPONSE_STATUS_SUCCESS,
                user,
                token,
                error: ""
            });
        } catch (err) {
            return res.send({
                status: constants.RESPONSE_STATUS_ERROR,
                error: constants.AUTH_RESPONSE.ERROR_INVALID_CREDENTIALS
            });
        }

    } catch (err) {
        return res.status(422).send({
            status: constants.RESPONSE_STATUS_ERROR,
            error: err
        });
    }
});

router.get('/test', (req, res) => {
    return res.send({
        nombre: "Mauricio"
    });
})

module.exports = router;