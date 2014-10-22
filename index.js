var server;
var httpServer;
var subData = '';
var http = require('http');
var fs = require('fs')

server = http.createServer(function (req, res) {
    if (req.headers.origin) {
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    }

    res.writeHead(200, {
        'Content-Type': 'text/vtt'
    });
    res.end(subData);
});

function startListening(port, cb) {
    httpServer = server.listen(port);
}

function stopServer(cb) {
    httpServer.close(function () {
        if (cb) {
            cb();
        }
    });
}

var simpleFileServer = {
    start: function (src, cb) {
        try {
            fs.readFile(src, {}, function (err, data) {
                subData = data;
                if (httpServer) {
                    stopServer(startListening(port, cb));
                } else {
                    startListening(cb);
                }
            });
        } catch (e) {
            console.log('Error Reading vtt');
        }
    },

    stop: function () {
        stopServer();
    }
};

module.exports = simpleFileServer
