const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const { exec } = require('child_process');
const axios = require('axios');
const qs = require('qs');


const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

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


  // let command ="";
  // if (language === 'python') {
  //   console.log("command set");
  //   command = `python -c "${code}"`;
  // } else if (language === 'javascript') {
  //   command = `node -e "${code}"`;
  // }else if (language === 'java') {
  //   command = `echo '${code}' | java -`;
  // }

  // // Execute the code using child_process
  //  exec(command, (error, stdout, stderr) => {
  //   if (error) {
  //     console.log("error worked");
  //     console.log(error.message);
  //     res.status(500).json({ error: error.message, stderr });
  //     return;
  //   }
  //   res.json({ output: stdout, stderr });
  //   console.log(stdout,stderr);
  // });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
