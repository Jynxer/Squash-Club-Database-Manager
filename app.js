const express = require('express');
const mysql = require('mysql');

const app = express();

app.use(express.urlencoded());

app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/style', express.static(__dirname + '/style'));

app.get('/', function(req, res) {
	res.sendFile('home.html', {'root': __dirname + '/pages'});
});

app.get('/showLeaguesPage', function(req, res) {
	res.sendFile('leagues.html', {'root': __dirname + '/pages'});
});

app.get('/newMatchPage', function(req, res) {
	res.sendFile('new_match.html', {'root': __dirname + '/pages'});
});

app.get('/oldiesCupPage', function(req, res) {
	res.sendFile('oldies_cup.html', {'root': __dirname + '/pages'});
});

app.get('/oldiesCup2018', function(req, res) {
	res.sendFile('oldies_cup_2018.html', {'root': __dirname + '/pages'});
});

app.get('/oldiesCup2018Data', function(req, res) {
	fetchData(res, 'Oldies Cup', 2018);
});

app.get('/oldiesCup2019', function(req, res) {
	res.sendFile('oldies_cup_2019.html', {'root': __dirname + '/pages'});
});

app.get('/oldiesCup2019Data', function(req, res) {
	fetchData(res, 'Oldies Cup', 2019);
});

app.get('/oldiesCup2020', function(req, res) {
	res.sendFile('oldies_cup_2020.html', {'root': __dirname + '/pages'});
});

app.get('/oldiesCup2020Data', function(req, res) {
	fetchData(res, 'Oldies Cup', 2020);
});

app.get('/alexanderMcLintochTrophyPage', function(req, res) {
	res.sendFile('alex_mclintoch_trophy.html', {'root': __dirname + '/pages'});
});

app.get('/amlTrophy2018', function(req, res) {
	res.sendFile('alex_mclintoch_trophy_2018.html', {'root': __dirname + '/pages'});
});

app.get('/amlTrophy2018Data', function(req, res) {
	fetchData(res, 'Alexander McLintoch Trophy', 2018);
});

app.get('/amlTrophy2019', function(req, res) {
	res.sendFile('alex_mclintoch_trophy_2019.html', {'root': __dirname + '/pages'});
});

app.get('/amlTrophy2019Data', function(req, res) {
	fetchData(res, 'Alexander McLintoch Trophy', 2019);
});

app.get('/amlTrophy2020', function(req, res) {
	res.sendFile('alex_mclintoch_trophy_2020.html', {'root': __dirname + '/pages'});
});

app.get('/amlTrophy2020Data', function(req, res) {
	fetchData(res, 'Alexander McLintoch Trophy', 2020);
});

app.post('/createMatch', function(req, res) {
	db.query("insert into played_match (p1_email, p2_email, p1_games_won, p2_games_won, date_played, court_number, venue_name, league_name, league_year) values ('" + req.body.p1_email + "', '" + req.body.p2_email + "', " + req.body.p1_games_won + ", " + req.body.p2_games_won + ", '" + req.body.date_played + "', " + req.body.court_number + ", '" + req.body.venue_name + "', '" + req.body.league_name + "', " + req.body.date_played.substring(0, 4) + ");", function(error, result, fields) {
		if (error) {
			console.log(error);
			res.sendFile('match_not_added.html', {'root': __dirname + '/pages'});
		} else {
			console.log(req.body.p1_email);
			console.log(req.body.p2_email);
			console.log(req.body.p1_games_won);
			console.log(req.body.p2_games_won);
			console.log(req.body.date_played);
			console.log(req.body.court_number);
			console.log(req.body.venue_name);
			console.log(req.body.league_name);
			res.sendFile('match_added.html', {'root': __dirname + '/pages'});
		}
	});
});

app.listen('3005', () => {
	console.log('Server started on port 3005!');
});

const db = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'jr263',
	password: '.WwUZ39QKpCq31',
	database: 'jr263_CS3101_P2',
	connectionLimit: 3000000
});

db.connect((err) => {
	if (err) throw err;
	console.log('Connected!');
	/*
	db.query("select * from player;", function (err, result, fields) {
		if (err) throw err;
		console.log(result);
	});
	*/
});

function fetchData(res, league, year) {
	db.query("select concat(player.forename, ' ', player.surname) as 'Player 1', concat(subquery.forename, ' ', subquery.surname) as 'Player 2', concat(subquery.p1_games_won, ' - ', subquery.p2_games_won) as 'Score', subquery.date_played as 'Date Played', subquery.court_number as 'Court Number', subquery.venue_name as 'Venue Name' from player right join (select played_match.p1_email, player.forename, player.surname, played_match.p1_games_won, played_match.p2_games_won, played_match.date_played, played_match.court_number, played_match.venue_name from player right join played_match on player.email=played_match.p2_email where played_match.p1_games_won>=0 and played_match.league_name='" + league + "' and year(played_match.date_played)=" + year + " order by played_match.date_played) as subquery on player.email=subquery.p1_email;", function(err, result, fields) {
		if  (err) throw err;
		var playerOne = [];
		var playerTwo = [];
		var score = [];
		var datePlayed = [];
		var courtNumber = [];
		var venueName = [];
		for (var row = 0; row < result.length; row++) {
			playerOne[row] = result[row]['Player 1'];
			playerTwo[row] = result[row]['Player 2'];
			score[row] = result[row].Score;
			datePlayed[row] = result[row]['Date Played'].toDateString();
			courtNumber[row] = result[row]['Court Number'];
			venueName[row] = result[row]['Venue Name'];
		}
		var out = [playerOne.slice(), playerTwo.slice(), score.slice(), datePlayed.slice(), courtNumber.slice(), venueName.slice()];
		var outJSON = JSON.stringify(out);
		//console.log(outJSON);
		res.write(outJSON);
		res.end();
	});
}
