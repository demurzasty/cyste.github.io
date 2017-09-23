function Game(canvas)
{
	this.canvas     = canvas;
	this.context    = canvas.getContext('2d');
	this.content    = new Content();
	this.network    = new Network();
	this.states     = [];
	this.state      = -1;
	this.serverTime = 0;

	this.fpsTotal  = 0;
	this.fps       = 0;
	this.fpsTime   = 0;

	this.ping      = 0;
	this.timePing  = 0;
	this.latency   = 0;

	this.timestamp = 0;
	this.acc       = 0;

	this.infos     = [];
	this.scale     = 1.0;

	this.isActive  = true;
}

Game.prototype.AddInfo = function(msg)
{
	if (this.infos.length > 0 && this.infos[this.infos.length - 1].msg == msg)
		return;

	this.infos.push({ text: msg , time: 0.0 });
};

Game.prototype.Update = function(deltaTime)
{
	if (this.infos.length > 0)
	{
		this.infos[0].time += deltaTime * 2.0;

		if (this.infos[0].time > 10.0)
			this.infos.splice(0, 1);
	}

	if (this.states[this.state].Update)
		this.states[this.state].Update(deltaTime);

	if (this.states[this.state].form)
		this.states[this.state].form.Update(deltaTime);
};

Game.prototype.RenderInfo = function()
{
	this.context.font      = '10px Verdana';
    this.context.textAlign = 'center';
    this.context.fillStyle = 'white'; // '#6495ED';

	if (this.infos.length > 0)
	{
		var info = this.infos[0];

		if (info.time < 1.0)
		{
			this.context.globalAlpha = info.time;
			this.context.fillText(info.text, this.canvas.width / 2, -5.0 + info.time * 20);
			this.context.globalAlpha = 1.0;
		}
		else if (info.time < 9.0)
		{
			this.context.fillText(info.text, this.canvas.width / 2, 15);
		}
		else
		{
			this.context.globalAlpha = (1.0 - (info.time - 9.0));
			this.context.fillText(info.text, this.canvas.width / 2, -5.0 + (1.0 - (info.time - 9.0)) * 20);
			this.context.globalAlpha = 1.0;
		}
	}
};

Game.prototype.Render = function()
{
	this.context.fillStyle = '#111111';
	this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

	if (!this.content.IsLoaded())
	{
        this.context.font      = '10px Verdana';
        this.context.textAlign = 'center';
        this.context.fillStyle = 'white';
        this.context.fillText(((this.content.counter / MAX_CONTENT * 100) | 0) + '%', this.canvas.width / 2, this.canvas.height / 2 - 5);
	}
	else if (!this.network.connected)
	{
        this.context.font      = '10px Verdana';
        this.context.textAlign = 'center';
        this.context.fillStyle = 'white';
        this.context.fillText('connecting', this.canvas.width / 2, this.canvas.height / 2 - 5);
	}
	else 
	{
		if (this.states[this.state].Render)
			this.states[this.state].Render();

		if (this.states[this.state].form)
			this.states[this.state].form.Render();

		this.RenderInfo();
	}
};

Game.prototype.WindowResize = function(width, height)
{
	this.canvas.width  = width;
	this.canvas.height = height;

	if (this.states[this.state].WindowResize)
		this.states[this.state].WindowResize(width, height);

	if (this.states[this.state].form)
		this.states[this.state].form.WindowResize(width, height);
};

var requestAnimationFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame;

Game.prototype.Loop = function(timestamp)
{
	if (this.timePing + 1000 < timestamp)
	{
		this.network.socket.emit('space_ping');
		this.latency  = Date.now();
		this.timePing = timestamp;
	}

	this.acc += (timestamp - this.timestamp);
	while (this.acc >= 16)
	{
		this.acc -= 16;
	}

	this.Update((timestamp - this.timestamp) / 1000.0);
	
	this.Render();

    this.context.font      = '10px Verdana';
    this.context.textAlign = 'left';
    this.context.fillStyle = 'white';
    this.context.fillText('PING: ', 10, 15);
    this.context.fillText('FPS: ', 10, 25);
    this.context.fillStyle = (this.fpsTotal >= 50) ? 'lime' : (this.fpsTotal >= 30) ? 'yellow' : 'red';
    this.context.fillText(this.fpsTotal, 45, 25);
	this.context.fillStyle = (this.ping <= 50) ? 'lime' : (this.ping <= 100) ? 'yellow' : 'red'; // '#6495ED';
	this.context.fillText(this.ping, 45, 15);
    
    if (this.fpsTime + 1000 < timestamp)
    {
    	this.fpsTotal = this.fps;
    	this.fps      = 0;
    	this.fpsTime  = timestamp;
    }
    else
    	this.fps++;


	this.timestamp = timestamp;

    animationFrame = requestAnimationFrame(function(timestamp) { game.Loop(timestamp); });
	// setTimeout(function() { game.Loop(); }, 1000 / FPS);
};

Game.prototype.SetState = function(state)
{
	if (this.state != -1 && this.states[this.state].form)
		this.states[this.state].form.Unload();

	this.state = state;

	if (this.states[this.state].form)
		this.states[this.state].form.Load();

	game.WindowResize(800, 600); // window.innerWidth, window.innerHeight);
}

function StartGame()
{
	game = new Game(document.getElementById('surface'));

	InitInput();

	game.states = [ new Menu(), new Play(), new Register() ];

	game.SetState(STATE_MENU);

	//window.onresize = function() { game.WindowResize(window.innerWidth, window.innerHeight); };
	window.onfocus  = function() { game.isActive = true; }; 
	window.onblur   = function() { game.isActive = false; }; 

	game.WindowResize(800, 600); // window.innerWidth, window.innerHeight);

	game.content.Load();

	requestAnimationFrame(function(timestamp) { game.Loop(timestamp); });
	// game.Loop();
}

var game = null;