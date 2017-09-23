function Content()
{
	this.backgrounds = [];
	this.ships       = [];
	this.fires       = [];
	this.bullets     = [];
	this.interfaces  = [];
	this.minerals    = [];
	this.effects     = [];
	this.counter     = 0;
}

Content.prototype.IsLoaded = function()
{
	return (this.counter == MAX_CONTENT);
}

Content.prototype.Load = function()
{
	for (var i = 0; i < MAX_IMAGE_BACKGROUNDS; i++)
	{
		this.backgrounds[i]        = new Image();
		this.backgrounds[i].onload = function() { game.content.counter++; };
		this.backgrounds[i].src    = 'assets/backgrounds/' + i + '.png';
	}

	for (var i = 0; i < MAX_IMAGE_SHIPS; i++)
	{
		this.ships[i]        = new Image();
		this.ships[i].onload = function() { game.content.counter++; };
		this.ships[i].src    = 'assets/ships/' + i + '.png';
	}

	for (var i = 0; i < MAX_IMAGE_FIRES; i++)
	{
		this.fires[i]        = new Image();
		this.fires[i].onload = function() { game.content.counter++; };
		this.fires[i].src    = 'assets/fires/' + i + '.png';
	}

	for (var i = 0; i < MAX_IMAGE_BULLETS; i++)
	{
		this.bullets[i]        = new Image();
		this.bullets[i].onload = function() { game.content.counter++; };
		this.bullets[i].src    = 'assets/bullets/' + i + '.png';
	}

	for (var i = 0; i < MAX_IMAGE_INTERFACES; i++)
	{
		this.interfaces[i]        = new Image();
		this.interfaces[i].onload = function() { game.content.counter++; };
		this.interfaces[i].src    = 'assets/interfaces/' + i + '.png';
	}

	for (var i = 0; i < MAX_IMAGE_MINERALS; i++)
	{
		this.minerals[i]        = new Image();
		this.minerals[i].onload = function() { game.content.counter++; };
		this.minerals[i].src    = 'assets/minerals/' + i + '.png';
	}

	for (var i = 0; i < MAX_IMAGE_EFFECTS; i++)
	{
		this.effects[i]        = new Image();
		this.effects[i].onload = function() { game.content.counter++; };
		this.effects[i].src    = 'assets/effects/' + i + '.png';
	}
};