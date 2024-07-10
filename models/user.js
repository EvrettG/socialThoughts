const { Schema, model } = require('mongoose');

// Regular expression to validate email addresses
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new Schema({
    userName: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [emailRegex, 'Please enter a valid email address']
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'thought'
      }],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'user'
    }]
  },
{
    toJSON: {
        virtuals: true,
      },
    id: false,
});

// Add virtual for friendCount
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

  // Initialize our User model
const User = model('user', userSchema);

module.exports = User;