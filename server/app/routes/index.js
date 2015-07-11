'use strict';
var router = require('express').Router();
module.exports = router;

// router.use('/tutorial', require('./tutorial'));

router.use('/comments', require('./comments'));
router.use('/video', require('./video'));
router.use('/users', require('./users'));
// router.use('socket', require('/socket'));

// Make sure this is after all of
// the registered routes!
router.use(function(req, res) {
    res.status(404).end();
});