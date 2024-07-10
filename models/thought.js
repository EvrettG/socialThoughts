// note thoughts and reactions will go here, with reactions being a sub document/schema of thoughts
const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => moment(timestamp).format('MMMM Do, YYYY [at] h:mm A'),
  },
}, {
  toJSON: {
    getters: true,
  },
  id: false,
});

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => moment(timestamp).format('MMMM Do, YYYY [at] h:mm A'),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema], // Correctly embedding the reaction schema
}, {
  toJSON: {
    getters: true,
    virtuals: true,
  },
  id: false,
});

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;