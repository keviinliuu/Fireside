const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tripSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    organizer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    budget: {
        type: Number,
        required: false
    },
    checklist: [{
        type: String,
        required: true
    }],
    activities: [{
        type: String,
        required: false
    }],
    equipment: [{
        type: String,
        required: true
    }]
}, {
    timestamps: true
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
