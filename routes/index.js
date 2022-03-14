const router = require('express').Router();
const apiRoutes = require('./index_api');
const htmlRoutes = require('./index_html');

router.use('/api', apiRoutes);
router.use('/', htmlRoutes);

module.exports = router;