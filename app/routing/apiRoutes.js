var path = require('path');
var friends = require('../data/friends.js');

module.exports = function(app) {
    app.get('/api/friends', function(req, res) {
        res.json(friends);
    });

    app.post('/api/friends', function(req, res) {
        //determine who has closest answers to user for best match. 
        //create object to measure difference between answers
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };

        //create user data coming from user, take scores from data, assign var
        var userData = req.body;
        var userScores = userData.scores;

        //calc difference between each user:
        var totalDifference = 0;
        //loop through friends in db
        for (var i = 0; i < friends.length; i++) {
            console.log(friends[i]);
            totalDifference = 0
            //loop through scores of each
            for (var j = 0; j < friends[i].scores[j]; j++) {
                //subtract user score from friends score, sum is totalDifference
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
                
                if (totalDifference <=  bestMatch.friendDifference) {
                    //resets bestMatch
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;
                } 
            }
        }
        //save user's data to db  
        friends.push(userData);
        res.json(bestMatch);
    });
    
};