const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// Route for posting request and returning response
router.post('/req', aiController.req);

// Route for posting request and returning response
router.post('/prompt', aiController.prompt);

// Route for getting response
// router.get('/getResponse', userController.getUserProfile);

// Export the router at the end of the file
module.exports = router;
