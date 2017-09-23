function Client()
{
	this.id         = 0;
	this.nickname   = 'undefined'
	this.ship       = 1;
	this.x          = 0;
	this.y          = 0;
	this.shield     = 0;
	this.lastX      = 0;
	this.lastY      = 0;
	this.targetX    = 0;
	this.targetY    = 0;
	this.targetTime = 0;
	this.fx         = 0;
	this.fy         = 0;
	this.rotation   = 0;
	this.lastRot    = 0;
	this.targetRot  = 0;
	this.accelerate = 0;
	this.score      = 0;

	this.inMoveIt     = 0;
	this.inRotationIt = 0;

	this.outMoveIt     = 0;
	this.outRotationIt = 0;

	this.inAccelerateIt = 0;

	this.fireAnim     = 0;
	this.fireTime     = 0;
}

Client.prototype.GetSpeed = function()
{
	return Math.sqrt(this.fx * this.fx + this.fy * this.fy);
};

Client.prototype.Update = function(deltaTime)
{
	if (this.accelerate > 0.5)
		this.fireAnim += deltaTime * 4.0;
	else
		this.fireAnim -= deltaTime;

	if (this.fireAnim < 0.0)
		this.fireAnim = 0.0;
	else if (this.fireAnim > 1.0)
		this.fireAnim = 1.0;

	this.fireTime += deltaTime;

	while (this.fireTime > 1.0)
		this.fireTime -= 1.0;
};

Client.prototype.Render = function(cameraX, cameraY)
{
	game.context.save();
        
    var img = game.content.ships[this.ship];
    
    game.context.translate(this.x - cameraX, this.y - cameraY);

    game.context.rotate(this.rotation);

    game.context.scale(game.scale, game.scale);
    
    if (this.fireAnim > 0.0)
    {
        game.context.globalAlpha = this.fireAnim;
        
        var s = this.fireAnim + Math.sin(this.fireTime * 100.0) * 0.1 - 0.1;
        
        game.context.scale(s, s);
        
        game.context.rotate(Math.cos(this.fireTime * 100.0) * 0.05 * this.fireAnim);

        img = game.content.fires[this.ship];
        
        game.context.drawImage(img, 0, 0, img.width, img.height, -img.width / 2, -img.height / 2, img.width, img.height);

        game.context.scale(1.0 / s, 1.0 / s);
        
        game.context.rotate(-Math.cos(this.fireTime * 100.0) * 0.05 * this.fireAnim);

        game.context.globalAlpha = 1.0;
    }

	img = game.content.ships[this.ship];
    game.context.drawImage(img, 0, 0, img.width, img.height, -img.width / 2, -img.height / 2, img.width, img.height);
    
    //if (this.accelerate > 0.5)
    //	game.context.drawImage(game.content.fires[0], 0, 0, img.width, img.height, -img.width / 2, -img.height / 2, img.width, img.height);

    game.context.restore();

    if (this == game.states[STATE_PLAY].me && this.shield > 0)
    {
    	var factor = this.shield / 100.0 - 0.00001;

		game.context.strokeStyle = '#333333';
		game.context.beginPath();
		game.context.lineWidth = 3.0;
		game.context.arc(this.x - cameraX - 25, this.y - cameraY + 25, 4.0, 0, 2.0 * Math.PI, false);
		game.context.stroke();

		game.context.strokeStyle = (factor < 0.25) ? 'red' : (factor < 0.50) ? 'yellow' : 'lime';
		game.context.beginPath();
		game.context.lineWidth = 3.0;
		game.context.arc(this.x - cameraX - 25, this.y - cameraY + 25, 4.0, 1.5 * Math.PI, factor * 2.0 * Math.PI - 0.5 * Math.PI, false);
		game.context.stroke();
	}
};


Client.prototype.RenderName = function(cameraX, cameraY)
{
    game.context.font      = '10px Verdana';
    game.context.textAlign = 'center';
    game.context.fillStyle = 'white';
    game.context.fillText(this.nickname, this.x - cameraX, this.y - cameraY - 40);
};