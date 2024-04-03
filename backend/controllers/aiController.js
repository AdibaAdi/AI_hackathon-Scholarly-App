// Import required packages and models
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// ai request fxn
exports.req = async (req, res) => {

  const { requestText } = req.body;

  /* 
  
  Put the open ai commands here. We have 
  to create a new thread, add a message, 
  run the thread, wait until the run is 
  complete, then send the response to the 
  thread back to the user

  Alternatively we could make a separate route to get the run after it completes, meaning the user would have to press a separate button?

  */

  //retrieve our assistant
  const assistant = await openai.beta.assistants.retrieve('asst_JlMIJGvXHHbYRd2eXh1YNmys');

  //thread setup
  const thread = await openai.beta.threads.create();

  //new message
  const message = await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: requestText
  })

  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistant.id
  })

  console.log('waiting for completion');
  //stays in loop until thread is complete
  complete = await openai.beta.threads.runs.retrieve(thread.id, run.id);
  while(complete.status != 'completed'){
    complete = await openai.beta.threads.runs.retrieve(thread.id, run.id);
  }
  console.log('complete');

  //this is test code displaying an old thread just to make sure it was working, it can be commented out.
  const messages = await openai.beta.threads.messages.list(thread.id);
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