const connection = require('../config/connection')

// const mongoose = require('mongoose');
// test if above is needed
const { User, Thought } = require('../models');

const seedUsers = [
  {
    userName: 'john_doe',
    email: 'john_doe@example.com',
    thoughts: [],
    friends: []
  },
  {
    userName: 'jane_doe',
    email: 'jane_doe@example.com',
    thoughts: [],
    friends: []
  },
];

const seedThoughts = [
  {
    thoughtText: 'This is a thought from john_doe',
    username: 'john_doe',
    reactions: [
      {
        reactionBody: 'Nice thought!',
        username: 'jane_doe'
      }
    ]
  },
  {
    thoughtText: 'This is another thought from john_doe',
    username: 'john_doe',
    reactions: []
  },
  {
    thoughtText: 'This is a thought from jane_doe',
    username: 'jane_doe',
    reactions: [
      {
        reactionBody: 'I agree!',
        username: 'john_doe'
      }
    ]
  },
];

connection.once('open', async () => {
  try {
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Insert seed users
    const createdUsers = await User.insertMany(seedUsers);

    // Insert seed thoughts
    const createdThoughts = await Thought.insertMany(seedThoughts);

    // Update users with thought references
    for (const thought of createdThoughts) {
      await User.updateOne(
        { userName: thought.username },
        { $push: { thoughts: thought._id } }
      );
    }

    console.log('Database seeded!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});