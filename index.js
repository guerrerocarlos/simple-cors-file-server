var http = require('http');
var fs = require('fs')

function SimpleServer(){
    var self = this

    self.server = http.createServer(function (req, res) {
        if (req.headers.origin) {
            res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        }

        res.writeHead(200, {
        });
        res.end(self.subData);
    });

};

SimpleServer.prototype.startListening = function(cb) {
    var self = this
    self.httpServer = self.server.listen(9999);
};

SimpleServer.prototype.stopServer = function(cb) {
    console.log("RESTARTING SIMPLE SERVER")
    var self = this
    self.httpServer.close(function () {
        if (cb) {
            cb();
        }
    });
};

SimpleServer.prototype.start = function(src, cb) {
        var self = this
        //try {
            fs.readFile(src, {}, function (err, data) {
                self.subData = data;
                if (self.httpServer) {
                    self.stopServer(function(){ self.startListening(cb) });
                } else {
                    self.startListening(cb);
                }
            });
        //} catch (e) {
          //  console.log('Error Reading vtt');
        //}
    }

module.exports = SimpleServer
