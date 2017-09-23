function Label(desc)
{
	this.id         = desc.id         ? desc.id         : 'undefined';
	this.x          = desc.x          ? desc.x          : 0;
	this.y          = desc.y          ? desc.y          : 0;
	this.width      = desc.width      ? desc.width      : 0;
	this.height     = desc.height     ? desc.height     : 0;
	this.fontFamily = desc.fontFamily ? desc.fontFamily : 'Verdana';
	this.fontSize   = desc.fontSize   ? desc.fontSize   : 10;
	this.text       = desc.text       ? desc.text       : '';
	this.textColor  = desc.textColor  ? desc.textColor  : 'white';
	this.textAlign  = desc.textAlign  ? desc.textAlign  : 'center';
}

Label.prototype.Render = function()
{
	if (this.text.length > 0)
	{
		game.context.font      = this.fontSize + 'px ' + this.fontFamily;
        game.context.textAlign = this.textAlign;
        game.context.fillStyle = this.textColor;
        game.context.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2 + this.fontSize / 2 - 1);
	}
};
