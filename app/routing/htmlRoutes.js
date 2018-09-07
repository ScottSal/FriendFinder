var path = require("path");
//in my export, pass in parameter app (express) when user hits survey, deliver html
module.exports = function (app) {
    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname + "../public/survey.html"));
    });
//takes to home page if not predefined
    app.use(function(req, res) {
        res.sendFile(path.join(__dirname + "../public/home.html"));
    });
};