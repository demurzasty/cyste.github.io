function Bullet(id)
{
	this.id       = id;
	this.sprite   = 0;
	this.x        = 0;
	this.y        = 0;
	this.fx       = 0;
	this.fy       = 0;
	this.rotation = 0;
}

Bullet.prototype.Update = function(deltaTime)
{
	this.x     += this.fx * deltaTime;
	this.y     += this.fy * deltaTime;
};

Bullet.prototype.Render = function(cameraX, cameraY)
{
    game.context.fillStyle = 'white';
	game.context.beginPath();
	game.context.arc(this.x - cameraX, this.y - cameraY, game.scale * 2.0, 0, 2 * Math.PI, false);
	game.context.fill();
};
