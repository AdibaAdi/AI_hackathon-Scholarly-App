import * as dotenv from 'dotenv';
import {OpenAI} from 'openai';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// //create new
// const assistant = await openai.beta.assistants.create({
//     name:"scholarlyAssistant",
//     instructions:"help with scholarship matching",
//     model: "gpt-3.5-turbo-0125",
// });

//retrieve created
// const assistant = await openai.beta.assistants.retrieve('asst_JlMIJGvXHHbYRd2eXh1YNmys');

//thread setup
// const thread = await openai.beta.threads.retrieve('thread_xedahm84ETqCNUa3Eu0QXQIv');

// //message creation
// const message = await openai.beta.threads.messages.create(thread.id, {
//     role: "user",
//     content: "resume: john smith, computer science student, 4.0 gpa. scholarships: 1. computer scientist scholarship 2. geologist scholarship 3. engineering scholarship"
// });

// // const run = await openai.beta.threads.runs.create(thread.id,{
// //     assistant_id: assistant.id,
// // })

// // console.log(run);

// const run = await openai.beta.threads.runs.retrieve(thread.id, 'run_y8iRyn2zyFfNr86Lo5it5qLs');

const messages = await openai.beta.threads.messages.list('thread_xedahm84ETqCNUa3Eu0QXQIv');

messages.body.data.forEach((message) => console.log(message.content))

//console.log(messages);