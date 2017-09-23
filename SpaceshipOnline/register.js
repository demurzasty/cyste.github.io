function Register()
{
	var self = this;

	this.form = new Form([
		new Label({
			id: 'lblUsername',
			text: 'Username:',
			x: game.canvas.width / 2,
			y: game.canvas.height - 2
		}),
		new Textbox({
            id: 'txtUsername',
            x: game.canvas.width / 2 - 64,
            y: game.canvas.height / 2 + 12,
            maxLength: 20
        }),
		new Label({
			id: 'lblNickname',
			text: 'Nickname:',
			x: game.canvas.width / 2,
			y: game.canvas.height / 2
		}),
		new Textbox({
            id: 'txtNickname',
            x: game.canvas.width / 2 - 64,
            y: game.canvas.height / 2 + 12,
            maxLength: 20
        }),
		new Label({
			id: 'lblPassword',
			text: 'Password:',
			x: game.canvas.width / 2,
			y: game.canvas.height / 2
		}),
		new Textbox({
            id: 'txtPassword',
            x: game.canvas.width / 2 - 64,
            y: game.canvas.height / 2 + 12,
            password: true,
            maxLength: 20
        }),
		new Button({
			id: 'btnRegister',
			text: 'Register',
			onclick: function(button, x, y) { self.OnRegisterClick(button, x, y); }
		}),
		new Button({
			id: 'btnBack',
			text: 'Back',
			onclick: function(button, x, y) { self.OnBackClick(button, x, y); }
		}),
	]);
}

Register.prototype.OnBackClick = function(button, x, y)
{
	game.SetState(STATE_MENU);
};

Register.prototype.OnRegisterClick = function(button, x, y)
{
	var txtUsername = this.form.Find('txtUsername');
	var txtNickname = this.form.Find('txtNickname');
	var txtPassword = this.form.Find('txtPassword');
	var btnRegister = this.form.Find('btnRegister');

	var username = txtUsername.text.trim();
	var nickname = txtNickname.text.trim();
	var password = txtPassword.text.trim();

	game.network.socket.emit('register_request', { username: username, nickname: nickname, password: password });

	btnRegister.Disable();
};

Register.prototype.Update = function(deltaTime)
{
	
};

Register.prototype.WindowResize = function(width, height)
{
	var lblUsername = this.form.Find('lblUsername');
	lblUsername.x = game.canvas.width  / 2;
	lblUsername.y = game.canvas.height / 2;

	var txtUsername = this.form.Find('txtUsername');
	txtUsername.x = game.canvas.width  / 2 - txtUsername.width  / 2;
	txtUsername.y = lblUsername.y + 12;

	var lblNickname = this.form.Find('lblNickname');
	lblNickname.x = game.canvas.width  / 2;
	lblNickname.y = txtUsername.y + 32;

	var txtNickname = this.form.Find('txtNickname');
	txtNickname.x = game.canvas.width  / 2 - txtNickname.width  / 2;
	txtNickname.y = lblNickname.y + 8;

	var lblPassword = this.form.Find('lblPassword');
	lblPassword.x = game.canvas.width  / 2;
	lblPassword.y = txtNickname.y + 32;

	var txtPassword = this.form.Find('txtPassword');
	txtPassword.x = game.canvas.width  / 2 - txtPassword.width  / 2;
	txtPassword.y = lblPassword.y + 12;

	var btnRegister = this.form.Find('btnRegister');
	btnRegister.x = game.canvas.width  / 2 - btnRegister.width / 2;
	btnRegister.y = txtPassword.y + 32;

	var btnBack = this.form.Find('btnBack');
	btnBack.x = game.canvas.width  / 2 - btnBack.width / 2;
	btnBack.y = btnRegister.y + 32;
};

Register.prototype.Render = function()
{
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
};

Register.prototype.Unload = function()
{
	
};