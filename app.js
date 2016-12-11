var express = require('express');
var app = express();

var logger = require('./logger');
// loogger is used to record the duration of every action, so it must be the first middleware
app.use(logger);

app.use(express.static('public'));

app.get('/blocks', function(request, response) {
    var blocks = ['Fixed', 'Movable', 'Rotating'];
    if (request.query.limit >= 0) {
        // localhost:3000/blocks?limit=0
        // localhost:3000/blocks?limit=1
        // ...
        response.json(blocks.slice(0, request.query.limit));
    } else {
        response.json(blocks);
    }
});


app.listen(3000, function() {
    console.log('Listening on port 3000');
});
