const { Schema, model } = require('mongoose');

const repoSchema = require('./Repo');

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

const User = model('User', userSchema);

module.exports = User;
