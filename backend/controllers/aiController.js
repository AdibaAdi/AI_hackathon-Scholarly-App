// Import required packages and models
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// AI request function
exports.req = async (req, res) => {
  var requestText = req.body;

  const { spawn } = require('child_process');
  const pythonProcess = spawn('python', ['./scraper.py']);

  // Await for the scraper to finish and update the requestText with the scholarship list
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

  // Retrieve the assistant
  const assistant = await openai.beta.assistants.retrieve('asst_JlMIJGvXHHbYRd2eXh1YNmys');

  // Setup the thread
  const thread = await openai.beta.threads.create();

  // Create a message for the resume
  console.log('Creating new message for resume');
  await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: "The following is my resume: " + requestText.resume
  });

  // Create a message for the scholarship list
  console.log('Creating new message for scholarship list');
  await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: "Scholarship List:\n\n" + requestText.scholarship_list
  });

  // Initiate the processing run after both messages are added to ensure they're considered together
  console.log('Initiating run to process both resume and scholarship list');
  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: assistant.id
  });

  console.log('Waiting for OpenAI run completion');
  // Stay in the loop until the thread processing is complete
  let complete = await openai.beta.threads.runs.retrieve(thread.id, run.id);
  while (complete.status !== 'completed') {
    complete = await openai.beta.threads.runs.retrieve(thread.id, run.id);
  }
  console.log('Processing complete');

  // Optional: Display messages from the thread
  const messages = await openai.beta.threads.messages.list(thread.id);
  messages.body.data.forEach((message) => console.log(message.content));

  try {
    // Send the processed information back to the user
    res.status(201).json({ messages });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
