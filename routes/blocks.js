var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false});

var blocks = {
    'Fixed': 'Fastened securely in position',
    'Movable': 'Capable of being moved',
    'Rotating': 'Moving in a circle around its center'
};

router.route('/')
    .get(function(request, response) {
        if (request.query.limit >= 0) {
            // localhost:3000/blocks?limit=0
            // localhost:3000/blocks?limit=1
            // ...
            response.json(Object.keys(blocks).slice(0, request.query.limit));
        } else {
            response.json(Object.keys(blocks));
        }
    })
    .post(parseUrlencoded, function(request, response) {
        var newBlock = request.body;
        blocks[newBlock.name] = newBlock.description;
        
        // 201 stands for "created"
        response.status(201).json(newBlock.name);
    });
    
router.route('/:name')
    .all(function(request, response, next) {
        var name = request.params.name;
        var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
        
        request.blockName = block;
        next();
    })
    .get(function(request, response) {
        // curl -i http://localhost:3000/blocks/Fixed
        var description = blocks[request.blockName];
        if (!description) {
            // description is undefined
            response.status(404).json('No description found for ' + request.params.name);
        } else {
            response.json(description);
        }
    })
    .delete(function(request, response) {
        delete blocks[request.blockName];
        
        // sendStatus sets the response body to OK
        response.sendStatus(200);
    });

module.exports = router;