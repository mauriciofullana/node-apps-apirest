const mongoose = require('mongoose');

const movementsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    holder: {
        type: String,
        required: true,
    },
    reference: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    isDebit: {
        type: Boolean,
        required: true
    }
});

mongoose.model('Movements', movementsSchema);
