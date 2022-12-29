const { Schema } = require('mongoose');

const issueSchema = new Schema ({
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
    issueId: {
        type: String,
        required: true,
    }
})

module.exports = issueSchema;