var subtitles_server = require("../index")

subtitles_server.start("./test/subtitles.vtt", 7777, function(){"Server closed"})
