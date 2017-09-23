function Button(desc)
{
	this.id         = desc.id         ? desc.id         : 'undefined';
	this.x          = desc.x          ? desc.x          : 0;
	this.y          = desc.y          ? desc.y          : 0;
	this.width      = desc.width      ? desc.width      : 100;
	this.height     = desc.height     ? desc.height     : 24;
	this.sx         = desc.sx         ? desc.sx         : 0;
	this.sy         = desc.sy         ? desc.sy         : 201;
	this.swidth     = desc.swidth     ? desc.swidth     : 100;
	this.sheight    = desc.sheight    ? desc.sheight    : 24;
	this.fontFamily = desc.fontFamily ? desc.fontFamily : 'Verdana';
	this.fontSize   = desc.fontSize   ? desc.fontSize   : 10;
	this.text       = desc.text       ? desc.text       : '';
	this.textColor  = desc.textColor  ? desc.textColor  : 'white';
	this.textAlign  = desc.textAlign  ? desc.textAlign  : 'center';
	this.onclick    = desc.onclick    ? desc.onclick    : false;
	this.state      = BUTTON_DEFAULT;
}

Button.prototype.IsDisabled = function()
{
	return (this.state == BUTTON_DISABLED);
};

Button.prototype.Disable = function()
{
	this.state = BUTTON_DISABLED;
};

Button.prototype.Enable = function()
{
	this.state = BUTTON_DEFAULT;
};

Button.prototype.MouseMove = function(x, y)
{
    if (x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height)
    {
        if (this.state == BUTTON_DEFAULT)
            this.state = BUTTON_HOVER;
    }
    else
    {
        if (this.state == BUTTON_HOVER)
            this.state = BUTTON_DEFAULT;
    }
};

Button.prototype.MouseDown = function(button, x, y)
{
    if (button == MOUSE_BUTTON_LEFT && x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height)
    {
        if (this.state == BUTTON_HOVER)
            this.state = BUTTON_ACTIVE;
        
        this.form.focus = this;
    }
};

Button.prototype.MouseUp = function(button, x, y)
{
    if (button == MOUSE_BUTTON_LEFT && x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height)
    {
        if (this.state == BUTTON_ACTIVE)
        {
            this.state = BUTTON_HOVER;
            
            if (this.onclick)
                this.onclick(button, x, y);
            
        }
    }
    else if (this.state == BUTTON_ACTIVE)
       	this.state = BUTTON_DEFAULT;
};

Button.prototype.Render = function()
{
	var offsets = [ 0, -1, 1, 0 ];

	game.context.drawImage(game.content.interfaces[0], 
		this.sx, 
		this.sy + this.sheight * this.state, 
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
        game.context.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2 + this.fontSize / 2 - 1 + offsets[this.state]);
	}
};
