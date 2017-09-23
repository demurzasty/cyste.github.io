function CheckBox(desc)
{
	this.id         = desc.id         ? desc.id         : 'undefined';
	this.x          = desc.x          ? desc.x          : 0;
	this.y          = desc.y          ? desc.y          : 0;
	this.width      = desc.width      ? desc.width      : 24;
	this.height     = desc.height     ? desc.height     : 24;
	this.sx         = desc.sx         ? desc.sx         : 100;
	this.sy         = desc.sy         ? desc.sy         : 201;
	this.swidth     = desc.swidth     ? desc.swidth     : 24;
	this.sheight    = desc.sheight    ? desc.sheight    : 24;
	this.fontFamily = desc.fontFamily ? desc.fontFamily : 'Verdana';
	this.fontSize   = desc.fontSize   ? desc.fontSize   : 10;
	this.text       = desc.text       ? desc.text       : '';
	this.textColor  = desc.textColor  ? desc.textColor  : 'white';
	this.textAlign  = desc.textAlign  ? desc.textAlign  : 'left';
	this.onclick    = desc.onclick    ? desc.onclick    : false;
	this.active     = desc.active     ? desc.active     : false;
}

CheckBox.prototype.MouseDown = function(button, x, y)
{
	if (x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height)
	{
		for (var i = 0; i < this.form.widgets.length; i++)
			if (this.form.widgets[i].active)
				this.form.widgets[i].active = false;

    	this.active = true;
	}
};

CheckBox.prototype.Render = function()
{
	game.context.drawImage(game.content.interfaces[0], 
		this.sx, 
		this.sy + (this.active ? this.sheight : 0), 
		this.swidth, 
		this.sheight, 
		Math.floor(this.x), 
		Math.floor(this.y), 
		this.width, 
		this.height);

	if (this.text.length > 0)
	{
		game.context.font      = this.fontSize + 'px ' + this.fontFamily;
        game.context.textAlign = this.textAlign;
        game.context.fillStyle = this.textColor;
        game.context.fillText(this.text, this.x + this.width + 4, this.y + this.height / 2 + this.fontSize / 2 - 1);
	}
};
