require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const qs = require('qs');
const file = require("./FileOperations");
const http = require('http');


const app = express();
const port = 4000;

const allowedOrigins = ['http://localhost:5173', 'https://code-pro-one.vercel.app'];

// Configure CORS with the allowed origins
app.use(cors({
  origin: allowedOrigins,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, 
}));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("DB Connection Successful");
})
.catch((err) => {
  console.error("Error connecting to the database:", err.message);
});


// Define an API endpoint for code execution
app.post('/compile', (req, res) => {
  const { code , language, input } = req.body;
  var languageCode = '5';

  switch (language) {
    case 'c':
      languageCode = '6' 
      break;
    case 'cpp':
      languageCode = '7' 
      break;
    case 'java':
      languageCode = '4' 
      break;
    case 'cs':
      languageCode = '1' 
      break;
    case 'js':
      languageCode = '17' 
      break;
    case 'go':
      languageCode = '20' 
      break;
  
    default:
      languageCode = '5'
      break;
  }

const options = {
  method: 'POST',
  url: 'https://code-compiler.p.rapidapi.com/v2',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': 'd816d3d66bmsh61000e59c1cf930p1f570ajsn9368d130bba2',
    'X-RapidAPI-Host': 'code-compiler.p.rapidapi.com'
  },
  data: {
    LanguageChoice: languageCode , Program: code , Input : input
  }
};

axios.request(options).then(function (response) {
  console.log(response.data);
  return res.send(response.data);
}).catch(function (error) {
  console.error(error);
});
});

app.use("/user", file);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

