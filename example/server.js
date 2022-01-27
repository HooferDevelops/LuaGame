// create an express server
const express = require('express');
const app = express();

// host the static files
app.use(express.static('public'));

// run on port 3000
app.listen(3000, () => {
  console.log('listening on port 3000');
});