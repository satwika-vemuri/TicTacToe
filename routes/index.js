var express = require('express');

module.exports = function(io) {
  var router = express.Router();

  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Tic Tac Toe Home', style: "index" });
  });

  router.get('/singleplayer', function(req, res, next) {
    res.render('board', { title: 'Singleplayer', 
                          style: "board", 
                          js: ["tictactoe",
                              "singleplayer"],
                          board: [["X","X", "X"], 
                                  ["X", "X", "X"], 
                                  ["X","X","X"]],
                          score: [0, 0]
                      });
  });

  router.get('/multiplayer', function(req, res, next) {
    res.render('board', { title: 'Multiplayer', style: "board",
    js: ["tictactoe",
    "singleplayer"]
});
  });

  return router;

}