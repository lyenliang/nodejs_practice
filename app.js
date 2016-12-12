var express = require('express');
var app = express();

var logger = require('./logger');
// loogger is used to record the duration of every action, so it must be the first middleware
app.use(logger);

app.use(express.static('public'));

var blocks = {
    'Fixed': 'Fastened securely in position',
    'Movable': 'Capable of being moved',
    'Rotating': 'Moving in a circle around its center'
};

// dynamic route
app.get('/blocks/:name', function(request, response) {
    // curl -i http://localhost:3000/blocks/Fixed
    var name = request.params.name;
    var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
    var description = blocks[block];
    if (!description) {
        // description is undefined
        response.status(404).json('No description found for ' + request.params.name);
    } else {
        response.json(description);
    }
}); 

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
