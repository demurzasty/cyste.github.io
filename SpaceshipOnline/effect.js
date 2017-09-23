function Effect()
{
	this.x           = 0;
	this.y           = 0;
	this.offsetX     = 0;
	this.offsetY     = 0;
	this.sprite      = 0;
	this.frame       = 0;
	this.maxFrames   = 0;
	this.frameWidth  = 0;
	this.frameHeight = 0;
	this.currentTime = 0.0;
	this.fadeIn      = false;
	this.fadeOut     = false;
	this.loop        = false;
	this.duration    = 0; 
	this.rotation    = 0;
}

Effect.prototype.Update = function(deltaTime)
{
	this.currentTime += deltaTime;
	/*
	while (this.currentTime >= this.frameTime)
	{
		this.frame++;
		if (this.duration == 0 && this.frame == this.maxFrames)
			this.frame = 0;

		this.currentTime -= this.frameTime;
	}
	*/
};

Effect.prototype.Render = function(cameraX, cameraY)
{
	game.context.save();
        
    var img = game.content.effects[this.sprite];

    game.context.globalAlpha = 1.0; // this.alpha;
    
    game.context.translate(this.x - cameraX, this.y - cameraY);

    game.context.rotate(this.rotation);

    // game.context.scale(game.scale, game.scale);

    var frame = ((this.currentTime / this.duration) * this.maxFrames) | 0;

    var sx = frame % (img.width / this.frameWidth);
    var sy = (frame / (img.width / this.frameWidth)) | 0;

    game.context.drawImage(img, sx * this.frameWidth, sy * this.frameHeight, this.frameWidth, this.frameHeight, -this.offsetX, -this.offsetY, this.frameWidth, this.frameHeight);

    game.context.restore();
};
