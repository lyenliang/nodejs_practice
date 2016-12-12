var express = require('express');
var app = express();

var logger = require('./logger');
// loogger is used to record the duration of every action, so it must be the first middleware
app.use(logger);
app.use(express.static('public'));

var blocks = require('./routes/blocks');
app.use('/blocks', blocks);

var locations = {
    'Fixed': 'First floor', 'Movable': 'Second floor', 'Rotating': 'Penthouse'
};

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

app.listen(3000, function() {
    console.log('Listening on port 3000');
});
