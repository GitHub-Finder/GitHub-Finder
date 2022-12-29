const { Schema, model } = require('mongoose');

const repoSchema = require('./Repo');
const issueSchema = require('./Issue');

const userSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must use a valid email address'],
      },
      password: {
        type: String,
        required: true,
      },
      savedRepos: [ repoSchema ],
      savedIssues: [ issueSchema ],
    },
    {
        toJSON: {
          virtuals: true,
        },
      }   
)

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

userSchema.virtual('repoCount').get(function () {
    return this.savedRepos.length;
  });

userSchema.virtual('issueCount').get(function () {
    return this.savedIssues.length;
  });

const User = model('User', userSchema);

module.exports = User;
