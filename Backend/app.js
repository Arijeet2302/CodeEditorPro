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

  var data = qs.stringify({
    'code': code,
    'language': language,
    'input': input
  });
  var config = {
      method: 'post',
      url: 'https://api.codex.jaagrav.in',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
  };

  axios(config)
  .then((response)=>{
    res.send(response.data);
  })
  .catch((err)=>{
    res.status(500).json({ error : err.message });
  })

});

app.use("/user", file);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
