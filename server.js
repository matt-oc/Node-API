// load the things we need
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const storage = require('node-persist');
const port = process.env.port || 3000;
let leaderboard = [{"name": "Jess", "score":100},
{"name": "John", "score": 92},
{"name": "Peter", "score": 90},
{"name": "Sarah", "score": 74},
{"name": "Pa", "score": 70},
{"name": "Jamie", "score": 59},
{"name": "Helen", "score": 55},
{"name": "Goodie", "score": 43},
{"name": "Josh", "score": 42},
{"name": "Alex", "score": 40}];
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
  console.log(leaderboard[1].score)
  for (var i = 0; i < leaderboard.length; i++){
    if (score.score > leaderboard[i].score && i <= 10) {
      leaderboard.splice(i, 0, score);
      leaderboard.splice(10,1)
      res.send('Congrats you got a top 10 score');
      store(leaderboard)
    }
  }
  res.send('Sorry your score didnt make it to the leaderboard');
});

app.listen(port);
console.log('Storage Server running on port 3000');

async function store(item)  {

await storage.init( /* options ... */ );
await storage.setItem('leaderboard',item)
console.log(await storage.getItem('leaderboard'));
}
