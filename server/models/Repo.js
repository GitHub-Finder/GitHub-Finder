const { Schema } = require('mongoose');

const repoSchema = new Schema ({
    username: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    repoId: {
        type: String,
        required: true,
    }
})

module.exports = repoSchema;