const express = require("express"); // USING REUIRE HERE BECAUSE THIS FILE IS HANDLED BY NODE JS AND NOT BY REACT AGAR REACT SE HOTI TO IMPORT USE KARTE
require('dotenv').config(); // OUR API KEY IS LOADED INTO THE ENVIROMENT
const cors = require("cors"); // CORS MODULE IS THE MIDDLE WARE FOR EXPRESS JS IT IS USED A SECURITY PUPOSE BY BLOCKING OTHER WEBSITES USING THE SERVER
const bodyParser = require("body-parser"); // PARSE THE INCOMING BODY USE TO EXTRACT THE DATA 
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(bodyParser.json());
app.use(cors())

const configuration = new Configuration({
    apiKey: process.env.CHATBOT_KEY,
});
// CHATBOT_KEY is key name in .env file. .env file should be in project root directory - format is below
// CHATBOT_KEY="YOR-API-KEY"

const openai = new OpenAIApi(configuration);
app.post("/chat", async (req, res) => {
  const { prompt } = req.body;
  const completion = await openai.createCompletion({
    model: "text-davinci-003", 
    prompt: prompt,
    max_tokens: 2048,
  });
  res.send(completion.data.choices[0].text);
});

const port = 5555;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});