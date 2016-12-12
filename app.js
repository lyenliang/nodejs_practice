var express = require('express');
var app = express();

var logger = require('./logger');
// loogger is used to record the duration of every action, so it must be the first middleware
app.use(logger);

app.use(express.static('public'));

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false});

var blocks = {
    'Fixed': 'Fastened securely in position',
    'Movable': 'Capable of being moved',
    'Rotating': 'Moving in a circle around its center'
};

var locations = {
    'Fixed': 'First floor', 'Movable': 'Second floor', 'Rotating': 'Penthouse'
};

app.post('/blocks', parseUrlencoded, function(request, response) {
    var newBlock = request.body;
    blocks[newBlock.name] = newBlock.description;
    
    // 201 stands for "created"
    response.status(201).json(newBlock.name);
});

// Accessing custom properties on request
app.param('name', function(request, response, next) {
    var name = request.params.name;
    var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
    
    request.blockName = block;
    next();
});

// dynamic route
app.get('/blocks/:name', function(request, response) {
    // curl -i http://localhost:3000/blocks/Fixed
    var description = blocks[request.blockName];
    if (!description) {
        // description is undefined
        response.status(404).json('No description found for ' + request.params.name);
    } else {
        response.json(description);
    }
}); 

app.get('/locations/:name', function(request, response) {
    // curl -i http://localhost:3000/blocks/Fixed
    var description = locations[request.blockName];
    if (!description) {
        // description is undefined
        response.status(404).json('No description found for ' + request.params.name);
    } else {
        response.json(description);
    }
}); 

app.get('/blocks', function(request, response) {
    if (request.query.limit >= 0) {
        // localhost:3000/blocks?limit=0
        // localhost:3000/blocks?limit=1
        // ...
        response.json(Object.keys(blocks).slice(0, request.query.limit));
    } else {
        response.json(Object.keys(blocks));
    }
});


app.listen(3000, function() {
    console.log('Listening on port 3000');
});
