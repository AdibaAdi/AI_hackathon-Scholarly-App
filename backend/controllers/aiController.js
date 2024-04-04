// Import required packages and models
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// ai request fxn
exports.req = async (req, res) => {

  var requestText = req.body;

  const { spawn } = require('child_process');

  const pythonProcess = spawn('python', ['./scraper.py']);

  await new Promise((resolve, reject) => {
    pythonProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
      requestText.scholarship_list = `${data}`;
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      resolve();
    });
  });
  //retrieve our assistant
  const assistant = await openai.beta.assistants.retrieve('asst_JlMIJGvXHHbYRd2eXh1YNmys');

  //thread setup
  const thread = await openai.beta.threads.create();

  //new message
  console.log('new message creation');
  const message = await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: "The following is my resume followed by a list of scholarships offered: " + requestText.resume + "\n\nScholarhship List:\n\n" + requestText.scholarship_list
  })

  console.log('new run creation');
  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistant.id
  })

  console.log('waiting for openai run completion');
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