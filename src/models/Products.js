const mongoose = require('mongoose');

const ProductTypes = ["CURRENT_ACCOUNT", "SAVINGS_ACCOUNT", "CREDIT_CARD"];

const productsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    productNumber: {
        type: String,
        required: true,
    },
    alias: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    productType: {
        type: String,
        required: true,
        enum: ProductTypes
    },
    currency: {
        type: String,
        required: true,
    }
});

mongoose.model('Products', productsSchema);
