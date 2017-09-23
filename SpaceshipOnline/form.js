function Form(widgets)
{
	this.widgets = widgets;
	this.focus   = null;

	for (var i = 0; i < this.widgets.length; i++)
		this.widgets[i].form = this;
}

Form.prototype.Find = function(id)
{
	for (var i = 0; i < this.widgets.length; i++)
		if (this.widgets[i].id == id)
			return this.widgets[i];

	return null;
}

Form.prototype.MouseMove = function(x, y)
{
	for (var i = 0; i < this.widgets.length; i++)
		if (this.widgets[i].MouseMove)
			this.widgets[i].MouseMove(x, y);
};

Form.prototype.MouseDown = function(button, x, y)
{
	this.focus = null;
	for (var i = 0; i < this.widgets.length; i++)
		if (this.widgets[i].MouseDown)
			this.widgets[i].MouseDown(button, x, y);
};

Form.prototype.MouseUp = function(button, x, y)
{
	for (var i = 0; i < this.widgets.length; i++)
		if (this.widgets[i].MouseUp)
			this.widgets[i].MouseUp(button, x, y);
};

Form.prototype.KeyDown = function(key)
{
	for (var i = 0; i < this.widgets.length; i++)
		if (this.widgets[i].KeyDown)
			this.widgets[i].KeyDown(key);
};

Form.prototype.KeyUp = function(key)
{
	for (var i = 0; i < this.widgets.length; i++)
		if (this.widgets[i].KeyUp)
			this.widgets[i].KeyUp(key);
};

Form.prototype.WindowResize = function(width, height)
{
	for (var i = 0; i < this.widgets.length; i++)
		if (this.widgets[i].WindowResize) // callback
			this.widgets[i].WindowResize(width, height);
};

Form.prototype.Update = function(deltaTime)
{
	for (var i = 0; i < this.widgets.length; i++)
		if (this.widgets[i].Update)
			this.widgets[i].Update(deltaTime);
};

Form.prototype.Render = function()
{
	for (var i = 0; i < this.widgets.length; i++)
		if (this.widgets[i].Render)
			this.widgets[i].Render();
};

Form.prototype.Load = function()
{
	for (var i = 0; i < this.widgets.length; i++)
		if (this.widgets[i].Load)
			this.widgets[i].Load();
};

Form.prototype.Unload = function()
{
	for (var i = 0; i < this.widgets.length; i++)
		if (this.widgets[i].Unload)
			this.widgets[i].Unload();
};