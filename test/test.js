var server = new (require("../index"))()

server.start("./test/subtitles.vtt", function(){"Server closed"})
