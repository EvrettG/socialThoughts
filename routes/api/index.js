const router = require('express').Router();
const thoughtRoutes = require('./thoughts');
const userRoutes = require('./users');
// Sorts api routes via thoughts or user actions
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;