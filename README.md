# PokemonMap-for-GoPatrol
A web display for [GoPatrol](https://github.com/GoPatrolTeam/GoPatrol)
![123](http://i217.photobucket.com/albums/cc44/x3388638/2016-09-07%20232925_zps6p81zcc1.png)
## Usage
```
git clone https://github.com/GoPatrolTeam/GoPatrol.git
cd GoPatrol
npm install express --save
npm install socket.io --save
```

Build the web server & socketIO
```
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.send('<h1>Hello world</h1>');
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
```
Add websocket event handler
```
io.on('connection', function(socket) {
	socket.on('giveMeCurrentPokemons', function(req) {
		if(req) {
			event.emit("checkLastTime", runningSpotterId);
			setTimeout(function() {
				pokemons.forEach((val, i) => {
					io.emit('newPokemon', val);
				});
			}, 2000);
		}
	});
});
```
Push data to client in `checkLastTime` event handler
```
event.emit("informToActiveUsers", pokemons[i], lastTime); // the original code
io.emit('newPokemon', pokemons[i]);
```
Finally, build the client and enjoy
```
git clone https://github.com/x3388638/PokemonMap-for-GoPatrol.git
cd PokemonMap-for-GoPatrol
npm install
npm run build
live-server
```
