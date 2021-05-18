# Node-Storage-API
Node js server hosted on Heroku that exposes an API to store data.

Available at : node-storage-api.herokuapp.com

Supports a GET at /leaderboard which returns an array with JSON objects containing the top 10 scores.
Also supports a POST at /addscore which takes a json object. The score will be added to the leaderboard if in the top 10.

{"name": "NAME", "score": "SCORE"}
