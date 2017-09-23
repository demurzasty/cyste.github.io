function Mineral(id, type)
{
	this.id       = id;
	this.type     = type;
	this.x        = 0.0;
	this.y        = 0.0;
	this.rotation = 0.0;
	this.alpha    = 0.0;

	this.lastX    = 0.0;
	this.lastY    = 0.0;
	this.target   = null;
	this.time     = 0.0;

	this.scale    = 0.75 + Math.random() * 0.5;
}

Mineral.prototype.SetTarget = function(id)
{
	this.lastX  = this.x;
	this.lastY  = this.y;
	this.target = id;
	this.time   = 0.0;
}

Mineral.prototype.Update = function(deltaTime)
{
	this.alpha += deltaTime;
	if (this.alpha > 1.0)
		this.alpha = 1.0;

	this.rotation += deltaTime * Math.PI * 0.5;
};

Mineral.prototype.Render = function(cameraX, cameraY)
{
	if (this.x < cameraX || this.x > cameraX + game.canvas.width || this.y < cameraY || this.y > cameraY + game.canvas.height)
		return;


    game.context.fillStyle = 'yellow';
	game.context.beginPath();
	game.context.arc(this.x - cameraX, this.y - cameraY, 3.0, 0, 2 * Math.PI, false);
	game.context.fill();
	
	/*
	game.context.save();
        
    var img = game.content.minerals[this.type];

    game.context.globalAlpha = this.alpha;
    
    game.context.translate(this.x - cameraX, this.y - cameraY);

    game.context.rotate(this.rotation);

    game.context.scale(game.scale, game.scale);

    game.context.scale(this.scale, this.scale);

    game.context.drawImage(img, 0, 0, img.width, img.height, -img.width / 2, -img.height / 2, img.width, img.height);

    game.context.restore();
    */
};
