// Import required packages and models
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// ai request fxn
exports.req = async (req, res) => {

  /* 
  
  Put the open ai commands here. We have 
  to create a new thread, add a message, 
  run the thread, wait until the run is 
  complete, then send the response to the 
  thread back to the user

  */

  //this is test code displaying an old thread just to make sure it was working, it can be commented out.
  const messages = await openai.beta.threads.messages.list('thread_xedahm84ETqCNUa3Eu0QXQIv');
  messages.body.data.forEach((message) => console.log(message.content))

  try {
    //if (err) throw err;

    //we have to put the response in a variable and pass it to the user here
    res.status(201).json({ messages });
  } catch (err) {
    // Log and return any server errors
    //console.error(err.message);
    res.status(500).send('Server error');
  }
};