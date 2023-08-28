const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({

    name : {
        type: String,
        required: true,
    },

    description : {
        type: String,
        required: true,
    },

    image : {
        type: String,
        required: false,
    },

    video : {
        type: String,
        required: false,
    },

    type : {
        type: String,
        required: true,
    },

    muscle : {
        type: String,
        required: true,
    }

});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;