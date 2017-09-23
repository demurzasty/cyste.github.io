function Play()
{
	var self = this;

	this.me         = new Client();
	this.lastX      = 0;
	this.lastY      = 0;
	this.lastRot    = 0;
	this.clients    = [];
	this.cameraX    = 0;
	this.cameraY    = 0;
	this.mapWidth   = 0;
	this.mapHeight  = 0;
	this.chat       = [];
	this.bullets    = [];
	this.bulletTime = 0.0;
	this.minerals   = [];
	this.effects    = [];
	this.sendTime   = 0.0;
	this.sentence   = 0.0;
	this.myMinerals   = [ 0, 0, 0, 0 ];
	this.form       = new Form([
		new Textbox({
			id: 'txtChat',
			x: 10,
			y: game.canvas.height - 34,
			width: 260,
			swidth: 260,
			sy: 321,
			maxLength: 40,
			opacity: 0.5
		})
	]);
}

Play.prototype.FindClient = function(id)
{
	if (this.me.id == id)
		return this.me;
	
	for (var i = 0; i < this.clients.length; i++)
		if (this.clients[i].id == id)
			return this.clients[i];

	return null;
}

Play.prototype.DestroyPlayer = function(data)
{
    console.log('DestroyPlayer');

	var client = this.FindClient(data.id);
	if (client == null)
		return;

	var effect = new Effect();
	effect.x = client.x;
	effect.y = client.y;
	effect.offsetX = 32;
	effect.offsetY = 32;
	effect.sprite = 1;
	effect.maxFrames = 25;
	effect.frameWidth = 64;
	effect.frameHeight = 64;
	effect.duration = 1.25;
	this.effects.push(effect);

	client.x = data.x;
	client.y = data.y;
	client.fx = 0;
	client.fy = 0;
	client.targetX = data.x;
	client.targetY = data.y;
	client.lastX = data.x;
	client.lastY = data.y;

	client.shield = data.shield;

	game.AddInfo(client.nickname + ' has been destroyed!');
};

Play.prototype.UpdateShield = function(id, shield)
{
	var client = this.FindClient(id);
	if (client != null)
		client.shield = shield;
};

Play.prototype.AddChatMessage = function(id, msg)
{
	if (id == null)
		this.chat.splice(0, 0, { nickname: this.me.nickname, text: msg, alpha: 0.0 });
	else
	{
		var client = this.FindClient(id);
		if (client != null)
			this.chat.splice(0, 0, { nickname: client.nickname, text: msg, alpha: 0.0 });
	}
};

Play.prototype.UpdateCamera = function()
{
	this.cameraX = this.me.x - game.canvas.width  / 2;
	this.cameraY = this.me.y - game.canvas.height / 2;

	if (this.cameraX < 0)
		this.cameraX = 0;

	if (this.cameraY < 0)
		this.cameraY = 0;

	if (this.cameraX > this.mapWidth - game.canvas.width)
		this.cameraX = this.mapWidth - game.canvas.width;

	if (this.cameraY> this.mapHeight - game.canvas.height)
		this.cameraY = this.mapHeight - game.canvas.height;
};

Play.prototype.KeyDown = function(key)
{
	var txtChat = this.form.Find('txtChat');
	if (key == KEY_ENTER)
	{
		if (txtChat.text.length > 0)
		{
			game.network.socket.emit('chat', { msg: txtChat.text });

			this.AddChatMessage(null, txtChat.text);

			txtChat.SetText('');

			txtChat.Blur();
		}
		else if (this.form.focus == txtChat)
			txtChat.Blur();
		else
			txtChat.Focus();
	}
	else if (key == 88 || key == 120)
	{
		game.network.socket.emit('gather');
	}
};

Play.prototype.AddBullet = function(id, x, y, fx, fy, rotation, sprite)
{
	var bullet      = new Bullet(id);
	bullet.x        = x;
	bullet.y        = y;
	bullet.fx       = Math.cos(rotation) * 600.0 + fx;
	bullet.fy       = Math.sin(rotation) * 600.0 + fy;
	bullet.rotation = rotation;
	this.bullets.push(bullet);
};

Play.prototype.RemoveBullet = function(id)
{
	for (var i = 0; i < this.bullets.length; i++)
	{
		if (this.bullets[i].id == id)
		{
			this.bullets.splice(i, 1);
			return;
		}
	}
};

Play.prototype.AddMineral = function(id, type, x, y)
{
	var mineral = new Mineral(id, type);
	mineral.x   = x;
	mineral.y   = y;
	this.minerals.push(mineral);
};

Play.prototype.RemoveMineral = function(id, clientID)
{
	for (var i = 0; i < this.minerals.length; i++)
	{
		if (this.minerals[i].id == id)
		{
			this.minerals[i].SetTarget(clientID);
			//this.minerals.splice(i, 1);
			return;
		}
	}
};

Play.prototype.Update = function(deltaTime)
{
	if (this.bulletTime > 0.0)
		this.bulletTime -= deltaTime * 4.0;

	if (this.form.focus != this.form.Find('txtChat') && (keys[90] || keys[122] || keys[32]) && this.bulletTime <= 0.0)
	{
		// this.AddBullet(this.me.x, this.me.y, this.me.fx, this.me.fy, this.me.rotation, 0);
		game.network.socket.emit('new_bullet', 
		{ 
			x: this.me.x, 
			y: this.me.y, 
			fx: this.me.fx,
			fy: this.me.fy,
			rotation: this.me.rotation,
			sprite: 0
		})
		this.bulletTime = 0.25;
	}

/*
	if (keys[88] || keys[120])
	{
	}
*/
	for (var i = 0; i < this.effects.length; i++)
	{
		this.effects[i].Update(deltaTime);
		if (this.effects[i].duration > 0 && this.effects[i].currentTime > this.effects[i].duration)
			this.effects.splice(i--, 1);
	}

	for (var i = 0; i < this.bullets.length; i++)
	{
		this.bullets[i].Update(deltaTime);

		if (this.bullets[i].x < 0 || this.bullets[i].x > this.mapWidth || this.bullets[i].y < 0 || this.bullets[i].y > this.mapHeight)
			this.bullets.splice(i--, 1);
	}

	for (var i = 0; i < this.minerals.length; i++)
	{
		var mineral = this.minerals[i];

		mineral.Update(deltaTime);

		if (mineral.target != null)
		{
			mineral.time += deltaTime * 4.0;
			if (mineral.time < 1.0)
			{
				var client = this.FindClient(mineral.target);
				if (client != null)
				{
					var fx = client.x - mineral.x;
					var fy = client.y - mineral.y;
					var distance = Math.sqrt(fx * fx + fy * fy);
					fx /= distance;
					fy /= distance;

					mineral.x = mineral.lastX + (client.x - mineral.lastX) * mineral.time;
					mineral.y = mineral.lastY + (client.y - mineral.lastY) * mineral.time;
				}
				else
					mineral.target = null;
			}
			else
				this.minerals.splice(i--, 1);
		}
	}


	for (var i = 0; i < this.minerals.length; i++)
		this.minerals[i].Update(deltaTime);

	for (var i = 0; i < ((this.chat.length < CHAT_MAX_MESSAGES) ? this.chat.length : CHAT_MAX_MESSAGES); i++)
	{
		if (this.chat[i].alpha < 1.0)
			this.chat[i].alpha += deltaTime * 8.0;
		else // clamp
			this.chat[i].alpha = 1.0;
	}

	if (this.chat.length > CHAT_MAX_MESSAGES)
		this.chat[CHAT_MAX_MESSAGES].alpha -= deltaTime * 8.0;

	var txtChat = this.form.Find('txtChat');

	if (txtChat == this.form.focus)
	{
		txtChat.opacity = 1.0;
	}
	else
		txtChat.opacity = 0.5;

	if (keys[KEY_UP])
	{
		if (this.me.accelerate == 0)
		{
			this.me.accelerate = 1;
			game.network.socket.emit('accelerate_start');
		}
	}
	else
	{
		if (this.me.accelerate == 1)
		{
			this.me.accelerate = 0;
			game.network.socket.emit('accelerate_stop');
		}
	}

	// this.me.rotation += Math.PI * 2.0 / 15.0;
	
	if (keys[KEY_LEFT])
	{
		this.me.rotation -= deltaTime * Math.PI * 1.0;
		//game.network.socket.emit('change_rotation', { dir: -1 });
	}
	else if (keys[KEY_RIGHT])
	{
		this.me.rotation += deltaTime * Math.PI * 1.0;
		//game.network.socket.emit('change_rotation', { dir: 1 });
	}

	this.me.fx += Math.cos(this.me.rotation) * this.me.accelerate * DEFAULT_SPEED * deltaTime;
    this.me.fy += Math.sin(this.me.rotation) * this.me.accelerate * DEFAULT_SPEED * deltaTime;

    var speed = Math.sqrt(this.me.fx * this.me.fx + this.me.fy * this.me.fy);
    if (speed > 500.0)
   	{
   		this.me.fx /= speed;
   		this.me.fy /= speed;

   		this.me.fx *= 500.0;
   		this.me.fy *= 500.0;
   	}

	this.me.x += this.me.fx * deltaTime;
    this.me.y += this.me.fy * deltaTime;

    if (this.me.x < 0)
    {
        this.me.fx = -this.me.fx * 0.1;
        this.me.x = 0;
    }
    else if (this.me.x > this.mapWidth)
    {
        this.me.fx = -this.me.fx * 0.1;
        this.me.x = this.mapWidth;
    }
    
    if (this.me.y < 0)
    {
        this.me.fy = -this.me.fy * 0.1;
        this.me.y = 0;
    }
    else if (this.me.y > this.mapHeight)
    {
        this.me.fy = -this.me.fy * 0.1;
        this.me.y = this.mapHeight;
    }

    var diffX = this.lastX - this.me.x;
    var diffY = this.lastY - this.me.y;

    this.sendTime += deltaTime;

    var SEND_TIME = 0.100; // 0.032;

    //if (Math.sqrt(diffX * diffX + diffY * diffY) >= 1.0)
    if (this.sendTime > SEND_TIME)
    {
    	//if (Math.sqrt(diffX * diffX + diffY * diffY) >= 1.0)
    	{
	    	game.network.socket.emit('change_position', { x: this.me.x, y: this.me.y, rotation: this.me.rotation, it: this.me.outMoveIt });

	    	this.me.outMoveIt = (this.me.outMoveIt + 1) & 0xFFFFFF;

	    	this.lastX = this.me.x;
	    	this.lastY = this.me.y;
	    }
    }

/*
    //if (Math.abs(this.lastRot - this.me.rotation) > 0.104)
    if (this.sendTime > SEND_TIME)
    {
    	if (Math.abs(this.lastRot - this.me.rotation) > 0.104)
    	{
	    	game.network.socket.emit('change_rotation', { rotation: this.me.rotation, it: this.me.outRotationIt });

	    	this.me.outRotationIt = (this.me.outRotationIt + 1) & 0xFFFFFF;

	    	this.lastRot = this.me.rotation;
	    }
    }
*/

    if (this.sendTime > SEND_TIME)
    	this.sendTime = 0.0;

    this.me.Update(deltaTime);
	for (var i = 0; i < this.clients.length; i++)
		this.clients[i].Update(deltaTime);


    for (var i = 0; i < this.clients.length; i++)
    {
    	var client = this.clients[i];

    	client.targetTime += deltaTime * (1.0 / SEND_TIME);
    	//if (client.targetTime > 1.0)
    	//	client.targetTime = 1.0;

    	client.x = client.lastX + (client.targetX - client.lastX) * client.targetTime;
    	client.y = client.lastY + (client.targetY - client.lastY) * client.targetTime;
		client.rotation = client.lastRot + (client.targetRot - client.lastRot) * client.targetTime;
/*
    	var time = currTime - client.targetTime;
    	if (time > 0.0)
    	{
    		var factor = time / 100.0;

    		client.x = client.lastX + (client.targetX - client.lastX) * factor;
    		client.y = client.lastY + (client.targetY - client.lastY) * factor;
    		//client.rotation = client.lastRot + (client.targetRot - client.lastRot) * factor;
    	}
    	*/
    	//if (Math.abs(client.x - client.targetX) > 1.0 || Math.abs(client.x))
		//this.clients[i].fx += Math.cos(this.clients[i].rotation) * this.clients[i].accelerate * DEFAULT_SPEED * deltaTime;
	    //this.clients[i].fy += Math.sin(this.clients[i].rotation) * this.clients[i].accelerate * DEFAULT_SPEED * deltaTime;

		//this.clients[i].x += this.clients[i].fx * deltaTime;
	    //this.clients[i].y += this.clients[i].fy * deltaTime;
    }

	this.UpdateCamera();
};

Play.prototype.WindowResize = function(width, height)
{
	var txtChat = this.form.Find('txtChat');

	txtChat.y = height - txtChat.height - 10;
};

Play.prototype.LoginAccept = function(data)
{
	this.me.id       = data.id;
	this.me.x        = data.x;
	this.me.y        = data.y;
	this.me.shield   = data.shield;
	this.me.ship     = data.ship % 2;
	this.lastX       = data.x;
	this.lastY       = data.y;
	this.targetX     = data.x;
	this.targetY     = data.y;
	this.me.rotation = data.rotation;
	this.lastRot     = data.rotation;
	this.me.nickname = data.nickname;
	this.mapWidth    = data.mapWidth;
	this.mapHeight   = data.mapHeight;
};

Play.prototype.SetScore = function(id, score)
{
	var client = this.FindClient(id);
	if (client != null)
	{
		client.score = score;

		this.SortClients();
	}
};

Play.prototype.NewClient = function(data)
{
	var client      = new Client();
	client.id       = data.id;
	client.x        = data.x;
	client.y        = data.y;
	client.score    = data.score;
	client.ship     = data.ship;
	client.shield   = data.shield;
	client.rotation = data.rotation;
	client.nickname = data.nickname;
	this.clients.push(client);
	//this.AddInfo('New player has been connected: ' + client.nickname);
	//this.AddInfo('# New player has been connected: ' + client.nickname);
};

Play.prototype.ChangePosition = function(data)
{
	var client = this.FindClient(data.id);
	if (client == null)
		return;

	if (data.it <= client.inMoveIt)
        console.log('async');

	if (data.it > client.inMoveIt)
	{
		/*
		console.log(Date.now() + '#' + data.time);

		var factor = (Date.now() - data.time) / 1000.0;
		var fx     = data.fx;
		var fy     = data.fy;
		var length = Math.sqrt(fx * fx + fy * fy);

		fx /= length;
		fy /= length;
		*/

		client.lastRot      = client.rotation;
		client.targetRot    = data.rotation;

		client.lastX    = client.x;
		client.lastY    = client.y;
		client.targetX  = data.x;
		client.targetY  = data.y;
		client.targetTime = 0.0;
		client.inMoveIt = data.it;
	}
};

Play.prototype.ChangeRotation = function(data)
{
	var client = this.FindClient(data.id);
	if (client == null)
		return;

	if (data.it <= client.inRotationIt)
        console.log('async');

	if (data.it > client.inRotationIt)
	{
		client.lastRot      = client.rotation;
		client.targetRot    = data.rotation;
		client.inRotationIt = data.it;
	}
};

Play.prototype.AccelerateStart = function(id, it)
{
	var client = this.FindClient(id);
	if (client == null)
		return;

	if (it > client.inAccelerateIt)
	{
		client.accelerate     = 1.0;
		client.inAccelerateIt = it;
	}
};

Play.prototype.AccelerateStop = function(id, it)
{
	var client = this.FindClient(id);
	if (client == null)
		return;

	if (it > client.inAccelerateIt)
	{
		client.accelerate     = 0.0;
		client.inAccelerateIt = it;
	}
};

Play.prototype.SortClients = function()
{
	console.log('sorting');
	for (var n = this.clients.length; n > 1; n--)
	{
		for (var i = 0; i < n - 1; i++)
		{
			if (this.clients[i].score < this.clients[i + 1].score)
			{
				var temp            = this.clients[i];
				this.clients[i]     = this.clients[i + 1];
				this.clients[i + 1] = temp;
			}
		}
	}
};

Play.prototype.RemoveClient = function(data)
{
	for (var i = 0; i < this.clients.length; i++)
	{
		if (this.clients[i].id == data.id)
		{
			this.clients.splice(i, 1);
			return;
		}
	}
};

Play.prototype.RenderChat = function()
{
	game.context.font      = '10px Verdana';
    game.context.textAlign = 'left';

    var length  = (this.chat.length < CHAT_MAX_MESSAGES) ? this.chat.length : CHAT_MAX_MESSAGES;
    var offsetY = 0;

	for (var i = 0; i < length; i++)
	{
		offsetY += (1.0 - this.chat[i].alpha) * 15;

		game.context.globalAlpha = this.chat[i].alpha;

        game.context.fillStyle = (this.chat[i].nickname == this.me.nickname) ? 'yellow' : 'lime';
        game.context.fillText(this.chat[i].nickname, 10, game.canvas.height - 39 - i * 15 + offsetY);

        var width = game.context.measureText(this.chat[i].nickname).width + 11;

        game.context.fillStyle = 'white';
        game.context.fillText(': ' + this.chat[i].text, width, game.canvas.height - 39 - i * 15 + offsetY);
	}

	if (this.chat.length > CHAT_MAX_MESSAGES && this.chat[CHAT_MAX_MESSAGES].alpha > 0.0)
	{
		game.context.globalAlpha = this.chat[CHAT_MAX_MESSAGES].alpha;

        game.context.fillStyle = (this.chat[CHAT_MAX_MESSAGES].nickname == this.me.nickname) ? 'yellow' : 'lime';
        game.context.fillText(this.chat[CHAT_MAX_MESSAGES].nickname, 10, game.canvas.height - 39 - CHAT_MAX_MESSAGES * 15 + offsetY);

        var width = game.context.measureText(this.chat[CHAT_MAX_MESSAGES].nickname).width + 11;

        game.context.fillStyle = 'white';
        game.context.fillText(': ' + this.chat[CHAT_MAX_MESSAGES].text, width, game.canvas.height - 39 - CHAT_MAX_MESSAGES * 15 + offsetY);
	}
	
	game.context.globalAlpha = 1.0;
};

Play.prototype.RenderClientList = function()
{
	var j = this.clients.length;
	game.context.font      = '10px Verdana';
    game.context.textAlign = 'left';
    game.context.fillStyle = 'lime'; // '#6495ED';

	game.context.fillText('Ranking:', game.canvas.width - 100, 15);

    game.context.fillStyle = 'white'; // '#6495ED';

	for (var i = 0; i < this.clients.length; i++)
	{
		if (this.clients[i].score <= this.me.score)
		{
			j = i;
			break;
		}
	}

	for (var i = 0; i < this.clients.length; i++)
	{
		if (i < j)
			game.context.fillText((i + 1) + ': ' + this.clients[i].nickname + ' - ' + this.clients[i].score, game.canvas.width - 100, 30 + i * 15);
		else if (i == j)
		{
			game.context.fillText((i + 1) + ': ' + this.me.nickname + ' - ' + this.me.score, game.canvas.width - 10, 30 + i * 15);
			game.context.fillText((i + 2) + ': ' + this.clients[i].nickname + ' - ' + this.clients[i].score, game.canvas.width - 100, 45 + i * 15);
		}
		else
			game.context.fillText((i + 2) + ': ' + this.clients[i].nickname + ' - ' + this.clients[i].score, game.canvas.width - 100, 45 + i * 15);
	}

	//if (this.clients.length > 0)
	//	game.context.fillText((j + 1) + ': ' + this.me.nickname + ' ' + this.me.score, game.canvas.width - 10, 30 + this.clients.length * 15);
	if (this.clients.length == 0)
		game.context.fillText('1: ' + this.me.nickname + ' - ' + this.me.score, game.canvas.width - 100, 30);
	else if (this.clients.length == j)
		game.context.fillText((j + 1) + ': ' + this.me.nickname + ' - ' + this.me.score, game.canvas.width - 100, 30 + j * 15);
};

Play.prototype.RenderMinimap = function()
{
/*
	game.context.globalAlpha = 0.5;

	game.context.fillStyle = '#FFFFFF';
	//game.context.fillRect(game.canvas.width - 210, game.canvas.height - 210, 200, 200);

	game.context.beginPath();
	game.context.rect(game.canvas.width - 210, game.canvas.height - 210, 200, 200);
	game.context.fillStyle = 'black';
	game.context.fill();
	game.context.beginPath();
	game.context.lineWidth = '1';
	game.context.rect(game.canvas.width - 211, game.canvas.height - 211, 202, 202);
	game.context.strokeStyle = 'grey';
	game.context.stroke();

	game.context.globalAlpha = 1.0;


	game.context.fillStyle = 'white';
	for (var i = 0; i < this.clients.length; i++)
	{
		game.context.beginPath();
		game.context.arc(this.clients[i].x / this.mapWidth * 200 + (game.canvas.width - 210), this.clients[i].y / this.mapHeight * 200 + (game.canvas.height - 210), 2.0, 0, 2 * Math.PI, false);
		game.context.fill();
	}

	game.context.fillStyle = 'yellow';
	game.context.beginPath();
	game.context.arc(this.me.x / this.mapWidth * 200 + (game.canvas.width - 210), this.me.y / this.mapHeight * 200 + (game.canvas.height - 210), 2.0, 0, 2 * Math.PI, false);
	game.context.fill();

/*
	var colors = [ 'brown', 'silver', 'gold', 'turquoise' ];
	for (var i = 0; i < this.minerals.length; i++)
	{
		game.context.fillStyle = colors[this.minerals[i].type];
		game.context.beginPath();
		game.context.arc(this.minerals[i].x / this.mapWidth * 200 + (game.canvas.width - 210), this.minerals[i].y / this.mapHeight * 200 + (game.canvas.height - 210), 2.0, 0, 2 * Math.PI, false);
		game.context.fill();
	}
*/
};

Play.prototype.RenderMineralsInfo = function()
{
	/*
	var names = [ 'COPPERIUM:', 'SILVERIUM:', 'GOLDINIUM:', 'MITHRILIUM:' ];

	game.context.font      = '10px Verdana';
    game.context.textAlign = 'left';
    game.context.fillStyle = 'white';

	for (var i = 0; i < this.myMinerals.length; i++)
	{
		game.context.fillText(names[i], 10, 45 + i * 15);

		game.context.fillText(this.myMinerals[i], 80, 45 + i * 15);
	}
	*/
};

Play.prototype.Render = function()
{
	/*
	var background = game.content.backgrounds[0];

	var backX = -this.cameraX % background.width;
	var backY = -this.cameraY % background.height;

    for (var i = 0; i <= Math.ceil(game.canvas.width / background.width); i++)
    {
        for (var j = 0; j <= Math.ceil(game.canvas.height / background.height); j++)
        {
            var x = backX + i * background.width;
            var y = backY + j * background.height;
            game.context.drawImage(background, 0, 0, background.width, background.height, x, y, background.width, background.height);
        }
    } 
*/
	for (var i = 0; i < this.bullets.length; i++)
		this.bullets[i].Render(this.cameraX, this.cameraY);

	for (var i = 0; i < this.minerals.length; i++)
		this.minerals[i].Render(this.cameraX, this.cameraY);

    for (var i = 0; i < this.clients.length; i++)
    	this.clients[i].Render(this.cameraX, this.cameraY);

    this.me.Render(this.cameraX, this.cameraY);

    for (var i = 0; i < this.effects.length; i++)
		this.effects[i].Render(this.cameraX, this.cameraY);

    for (var i = 0; i < this.clients.length; i++)
    	this.clients[i].RenderName(this.cameraX, this.cameraY);

    this.RenderChat();

    this.RenderClientList();

    this.RenderMinimap();

    this.RenderMineralsInfo();
};