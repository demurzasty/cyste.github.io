function Textbox(desc)
{
    var self = this;
    
    this.id          = desc.id          ? desc.id          : 'undefined';
    this.x           = desc.x           ? desc.x           : 0;
    this.y           = desc.y           ? desc.y           : 0;
    this.width       = desc.width       ? desc.width       : 128;
    this.height      = desc.height      ? desc.height      : 24;
	this.sx          = desc.sx          ? desc.sx          : 0;
	this.sy          = desc.sy          ? desc.sy          : 297;
	this.swidth      = desc.swidth      ? desc.swidth      : 128;
	this.sheight     = desc.sheight     ? desc.sheight     : 24;
    this.textColor   = desc.textColor   ? desc.textColor   : 'white';
    this.fontSize    = desc.fontSize    ? desc.fontSize    : 10;
    this.font        = desc.font        ? desc.font        : 'Verdana';
    this.text        = desc.text        ? desc.text        : '';
    this.placeholder = desc.placeholder ? desc.placeholder : '';
    this.password    = desc.password    ? desc.password    : false;
    this.maxLength   = desc.maxLength   ? desc.maxLength   : 20;
    this.opacity     = desc.opacity     ? desc.opacity     : 1.0;
    
    this.time  = 0.0;
    this.cover = '';
    
    this.hiddenInput                     = document.createElement('input');
    this.hiddenInput.type                = this.password ? 'password' : 'text';
    this.hiddenInput.style.position      = 'absolute';
    this.hiddenInput.style.opacity       = 0;
    // this.hiddenInput.style.pointerEvents = 'none';
    this.hiddenInput.style.left          = (this.x + game.canvas.offsetLeft + TEXTBOX_MARGIN_LEFT) + 'px';
    this.hiddenInput.style.top           = (this.y + game.canvas.offsetTop)  + 'px';
    this.hiddenInput.style.width         = (this.width - TEXTBOX_MARGIN_LEFT)  + 'px';
    this.hiddenInput.style.height        = this.height + 'px';
    this.hiddenInput.style.zIndex        = 0;
    this.hiddenInput.style.fontFamily    = this.font;
    this.hiddenInput.style.fontSize      = this.fontSize;

    this.hiddenInput.oninput          = function() { self.text = self.hiddenInput.value; self.time = 0.0; };
    this.hiddenInput.onpropertychange = this.hiddenInput.oninput; // for IE8

    if (this.maxLength)
        this.hiddenInput.maxLength = this.maxLength;
    
    // document.body.appendChild(this.hiddenInput);
    
    this.hiddenInput.value = this.text;
}

Textbox.prototype.Blur = function()
{
	this.form.focus = null;
	this.hiddenInput.blur();
}

Textbox.prototype.Focus = function()
{
    this.form.focus = this;
	this.hiddenInput.focus();
    this.time = 0.0;
};

Textbox.prototype.SetText = function(text)
{
	this.hiddenInput.value = text;
	this.text              = text;
};

Textbox.prototype.Update = function(deltaTime)
{
    this.hiddenInput.style.left = (this.x + game.canvas.offsetLeft) + 'px';
    this.hiddenInput.style.top  = (this.y + game.canvas.offsetTop)  + 'px';

    this.time += deltaTime;
    while (this.time > 1.0)
    	this.time -= 1.0;
};

Textbox.prototype.KeyDown = function(key)
{
    if (this.form.focus != this)
        return;
    
    this.hiddenInput.focus();
};

Textbox.prototype.MouseDown = function(button, x, y)
{
    if (button == MOUSE_BUTTON_LEFT && x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height)
    {
        if (this.state == BUTTON_HOVER)
            this.state = BUTTON_ACTIVE;
        
        this.Focus();
    }
};

Textbox.prototype.Render = function()
{
	if (this.cover.length != this.text.length)
    {
        this.cover = '';
        for (var i = 0; i < this.text.length; i++)
            this.cover += String.fromCharCode(8226);
    }
    
    var text = this.password ? this.cover : this.text;
    
    game.context.globalAlpha = this.opacity;
    game.context.drawImage(game.content.interfaces[0], this.sx, this.sy, this.swidth, this.sheight, Math.floor(this.x), Math.floor(this.y), this.width, this.height);
    game.context.globalAlpha = 1.0;

    game.context.font      = this.fontSize +  'px ' + this.font;
    game.context.textAlign = 'left';
    game.context.fillStyle = this.textColor;
   // console.log('start: ' + this.hiddenInput.selectionStart + ' end: ' + this.hiddenInput.selectionEnd);

    game.context.save();
    
    game.context.rect(this.x + TEXTBOX_MARGIN_LEFT, this.y, this.width - TEXTBOX_MARGIN_LEFT * 2, this.height);
    game.context.clip();
     
    var textX = this.x + TEXTBOX_MARGIN_LEFT;
    
    var textWidth = game.context.measureText(text).width;
     
    //if (this.form.focus == this && this.time < 0.5)
    //    text += '|';
     
    if (textWidth + TEXTBOX_MARGIN_LEFT * 3 < this.width)
        game.context.fillText(text, Math.floor(textX), Math.floor(this.y + this.height / 2 + this.fontSize / 2 - 1));
    else
        game.context.fillText(text, Math.floor(textX - TEXTBOX_MARGIN_LEFT* 3- (textWidth - this.width)), Math.floor(this.y + this.height / 2 + this.fontSize / 2 - 1));
    game.context.restore();

    
    if (this.hiddenInput.selectionStart == this.hiddenInput.selectionEnd)
    {
    	if (this.form.focus == this && this.time < 0.5)
    	{
	    	var size = game.context.measureText(text.substring(0, this.hiddenInput.selectionStart));

	    	game.context.strokeStyle = this.textColor;
	    	game.context.beginPath();
            game.context.lineWidth = 1.0;
	    	if (textWidth + TEXTBOX_MARGIN_LEFT * 3 < this.width) 
	    	{
                var x = Math.floor(this.x + TEXTBOX_MARGIN_LEFT + size.width);
				game.context.moveTo(x, this.y + this.height / 2 - this.fontSize / 2);
				game.context.lineTo(x, this.y + this.height / 2 + this.fontSize / 2);
			}
			else
			{
				game.context.moveTo(Math.round(this.x - TEXTBOX_MARGIN_LEFT * 2 - (textWidth - this.width) + size.width), this.y + this.height / 2 - this.fontSize / 2);
				game.context.lineTo(Math.round(this.x - TEXTBOX_MARGIN_LEFT * 2 - (textWidth - this.width) + size.width), this.y + this.height / 2 + this.fontSize / 2);
			}
			game.context.stroke();
		}
    }
    else if (this.hiddenInput.selectionStart < this.hiddenInput.selectionEnd)
    {
    	var left  = this.x + TEXTBOX_MARGIN_LEFT + game.context.measureText(text.substring(0, this.hiddenInput.selectionStart)).width;
    	var width = game.context.measureText(text.substring(this.hiddenInput.selectionStart, this.hiddenInput.selectionEnd)).width;

    	if (textWidth + TEXTBOX_MARGIN_LEFT * 3 >= this.width) 
    		left -= TEXTBOX_MARGIN_LEFT * 3 + (textWidth - this.width);

    	var alpha = game.context.globalAlpha;
    	game.context.globalAlpha = 0.5;
    	game.context.fillStyle = '#FFFFFF';
    	game.context.fillRect(left, this.y + this.height / 2 - this.fontSize / 2, width, this.fontSize);
    	game.context.globalAlpha = alpha;
    }
};

Textbox.prototype.Load = function()
{
	document.body.appendChild(this.hiddenInput);
};

Textbox.prototype.Unload = function()
{
	document.body.removeChild(this.hiddenInput);
};