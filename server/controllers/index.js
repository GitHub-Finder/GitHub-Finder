const router = require('express').Router();
const authRouter = require('./auth');
router.use('/v1', authRouter);

module.exports = router;
