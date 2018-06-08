const express = require('express');

const app = express();

app.use(express.static('public'));

app.get('/api/timestamp/:date_str', (req, res) => {
  if(!isNaN(req.params.date_str)) {//IS A NUMBER
    let str = req.params.date_str * 1000;
    let nd = new Date(str);
    let obj = {
      "unix": str,
      "utc": nd.toUTCString()
    };
    res.json(obj);
  } else {//2015-12-25
    let nd = new Date(req.params.date_str);
    if(!isNaN(nd)) {
      let obj = {
        "unix": nd.getTime(),
        "utc": nd.toUTCString()
      };
      res.json(obj);
    } else {
      res.json({ "error": "Invalid Date" });
    }
  }
});

app.get('/api/timestamp', (req, res) => {
  let date = new Date();
  let obj = {
    "unix": date.getTime(),
    "utc": date.toUTCString()
  };
  console.log('NO DATE PROVIDED');
  res.json(obj);
});

app.listen(3000, () => console.log('Listening on port 3000'));
