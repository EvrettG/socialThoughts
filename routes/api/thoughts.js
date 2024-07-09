const router = require('express').Router();

// gets all exported functions 
const {
    getThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');
// Vannila route for thoughts
router.route('/')
    .get(getThoughts)
    .post(createThought);
// rought for thoughts via id
router.route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// Route for adding reactions to a single thought
router.route('/:thoughtId/reactions')
    .post(addReaction);

// Route to delete a reaction via thought id AND reaction id 
router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;