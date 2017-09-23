function Menu()
{
	var self = this;
	var username = localStorage.getItem('username');

	this.form = new Form([
		new Label({
			id: 'lblUsername',
			text: 'Nickname:',
			x: game.canvas.width / 2,
			y: game.canvas.height / 2
		}),
		new Textbox({
            id: 'txtUsername',
            x: game.canvas.width / 2 - 64,
            y: game.canvas.height / 2 + 12,
            text: (username != null) ? username : '',
            maxLength: 20
        }),
		new CheckBox({
            id: 'chkShip0',
            x: game.canvas.width / 2 - 36,
            y: game.canvas.height / 2 + 72,
            active : true
        }),
		new CheckBox({
            id: 'chkShip1',
            x: game.canvas.width / 2 + 12,
            y: game.canvas.height / 2 + 72
        }),
		new Button({
			id: 'btnOkay',
			text: 'Okay',
			x: game.canvas.width / 2 - 50,
			y: game.canvas.height / 2 + 98,
			onclick: function(button, x, y) { self.OnOkayClick(button, x, y); }
		})
	]);
}

Menu.prototype.OnOkayClick = function(button, x, y)
{
	var txtUsername = this.form.Find('txtUsername');
	var txtPassword = this.form.Find('txtPassword');
	var btnOkay     = this.form.Find('btnOkay');
	var chkShip0    = this.form.Find('chkShip0');
	var ship        = (chkShip0.active ? 0 : 1);

	if (GUEST)
		game.network.socket.emit('login_request', { username: txtUsername.text, password: '', ship: ship });
	else
		game.network.socket.emit('login_request', { username: txtUsername.text, password: txtPassword.text });

	btnOkay.Disable();
};

Menu.prototype.OnRegisterClick = function(button, x, y)
{
	game.SetState(STATE_REGISTER);
};

Menu.prototype.Update = function(deltaTime)
{
	
};

Menu.prototype.WindowResize = function(width, height)
{
	/*
	var lblUsername = this.form.Find('lblUsername');
	lblUsername.x = game.canvas.width  / 2;
	lblUsername.y = game.canvas.height / 2;

	var txtUsername = this.form.Find('txtUsername');
	txtUsername.x = game.canvas.width  / 2 - txtUsername.width  / 2;
	txtUsername.y = lblUsername.y + 8;

if (!GUEST)
{
	var lblPassword = this.form.Find('lblPassword');
	lblPassword.x = game.canvas.width  / 2;
	lblPassword.y = txtUsername.y + 32;

	var txtPassword = this.form.Find('txtPassword');
	txtPassword.x = game.canvas.width  / 2 - txtPassword.width  / 2;
	txtPassword.y = lblPassword.y + 8;
}

	var btnOkay = this.form.Find('btnOkay');
	btnOkay.x = game.canvas.width  / 2 - btnOkay.width / 2;
	btnOkay.y = (GUEST ? txtUsername.y : txtPassword.y) + 32;

if (!GUEST)
{
	var btnRegister = this.form.Find('btnRegister');
	btnRegister.x = game.canvas.width  / 2 - btnRegister.width / 2;
	btnRegister.y = btnOkay.y + 32;
}
*/
};

Menu.prototype.Render = function()
{
    game.context.drawImage(game.content.ships[0], 
    	0, 0, 32, 32,
    	game.canvas.width / 2 - 40,
    	game.canvas.height / 2 + 38,
    	32,
    	32
    	);

    game.context.drawImage(game.content.ships[1], 
    	0, 0, 32, 32,
    	game.canvas.width / 2 + 8,
    	game.canvas.height / 2 + 38,
    	32,
    	32
    	);
	/*
	var background = game.content.backgrounds[0];
    for (var i = 0; i <= Math.ceil(game.canvas.width / background.width); i++)
    {
        for (var j = 0; j <= Math.ceil(game.canvas.height / background.height); j++)
        {
            var x = i * background.width;
            var y = j * background.height;
            game.context.drawImage(background, 0, 0, background.width, background.height, x, y, background.width, background.height);
        }
    }
    */
};

Menu.prototype.Unload = function()
{
	
};