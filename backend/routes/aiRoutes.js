const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// Route for posting request and returning response
router.get('/req', aiController.req);

// Route for getting response
// router.get('/getResponse', userController.getUserProfile);

// Export the router at the end of the file
module.exports = router;
