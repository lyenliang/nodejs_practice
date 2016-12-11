// log the duration of every action

module.exports = function(request, response, next) {
    var start = +new Date();
    var stream = process.stdout;
    var url = request.url;
    var method = request.method;

    // called when the response has been handed off to the OS
    response.on('finish', function(){
        var duration = +new Date() - start;
        var message = method + ' to ' + url + 
            '\ntook ' + duration + ' ms \n\n';
        stream.write(message);
    });

    // pass to next middleware
    next();
};
