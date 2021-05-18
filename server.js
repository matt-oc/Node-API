// load the things we need
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const storage = require('node-persist');
let leaderboard = [];
app.use(express.static(__dirname + '/storage'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Get Leaderboard
app.get('/leaderboard', function(req, res) {
  res.json(leaderboard)
});

// Add Score to leaderboard if top 10
app.post('/addscore', function(req, res) {
  const score = req.body;
  for (var i = 0; i < leaderboard.length; i++){
    if (score.score > leaderboard[i] && i <= 10) {
      leaderboard.splice(i, 0, score);
      res.send('Congrats you got a top 10 score');
      store(leaderboard)
    }
  }
  res.send('Sorry your score didnt make it to the leaderboard');
});

app.listen(8000);
console.log('Storage Server running on port 8000');

async function store(item)  {

await storage.init( /* options ... */ );
await storage.setItem('leaderboard',item)
console.log(await storage.getItem('leaderboard'));
}
