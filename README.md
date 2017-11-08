# PokemonMap-for-GoPatrol
A web display for [GoPatrol](https://github.com/GoPatrolTeam/GoPatrol)   
Pokemon icons from [pokemon-svg](https://github.com/jnovack/pokemon-svg)  

![](https://i.imgur.com/adPBoWq.gif)
## Usage
Clone the GoPatrol and fill out config and then
```
cd GoPatrol
npm install express --save
npm install socket.io --save
```

Build the web server & socketIO (GoPatrol/index.js)
```
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.use(express.static('web'));
app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/web/index.html'));
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
```
Add websocket event handler (GoPatrol/index.js)
```
io.on('connection', function(socket) {
	socket.on('giveMeCurrentPokemons', function(req) {
		if(req) {
			for (var i = pokemons.length - 1; i >= 0; i--) {
				var lastTime = getLastTime(pokemons[i].expirationTime);
				if (lastTime > 0 && lastTime <= fifteenMinutes) {
						io.emit('newPokemon', pokemons[i]);
				} else {
					pokemons.splice(i, 1);
				}
			}
		}
	});
});
```
Push data to client in `checkLastTime` event handler (GoPatrol/index.js)
```
event.emit("informToActiveUsers", pokemons[i], lastTime); // the original code
io.emit('newPokemon', pokemons[i]);
```
Clone this repo into GoPatrol/web
```
cd PATH/TO/GoPatrol
git clone https://github.com/x3388638/PokemonMap-for-GoPatrol.git web
```
Fill out config.js
```
cd PATH/TO/GoPatrol/web/static
mv config.js.example config.js
vim config.js
```
Finally, build the client and enjoy
```
cd PATH/TO/GoPatrol/web
npm install
npm run build
cd ..
npm start
open 127.0.0.1:3000
```
