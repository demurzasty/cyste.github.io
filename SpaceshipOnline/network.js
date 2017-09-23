function Network()
{
    var self = this;
    
    this.connected = false;
    this.socket    = io('http://' + IP + ':' + PORT);

    this.socket.on('connect', function() 
    {
        self.connected = true;

        console.log('connected');
    });
    
    this.socket.on('disconnect', function() 
    { 
        self.connected = false;
        
        console.log('disconnect'); 
    });

    this.socket.on('login_refuse', function(data)
    {
        game.states[STATE_MENU].form.Find('btnOkay').Enable();

        game.AddInfo(data.msg);
    });

    this.socket.on('register_refuse', function(data)
    {
        game.states[STATE_REGISTER].form.Find('btnRegister').Enable();

        game.AddInfo(data.msg);
    });

    this.socket.on('login_accept', function(data)
    {
        localStorage.setItem('username', game.states[STATE_MENU].form.Find('txtUsername').text.trim());

        game.SetState(STATE_PLAY);

        game.states[STATE_PLAY].LoginAccept(data);
    });

    this.socket.on('register_accept', function(data)
    {
        game.states[STATE_REGISTER].form.Find('btnRegister').Enable();

        game.SetState(STATE_MENU);
    });

    this.socket.on('new_client', function(data)
    {
        game.states[STATE_PLAY].NewClient(data);
    });

    this.socket.on('change_position', function(data)
    {
        game.states[STATE_PLAY].ChangePosition(data);
    });

    this.socket.on('change_rotation', function(data)
    {
        game.states[STATE_PLAY].ChangeRotation(data);
    });

    this.socket.on('remove_client', function(data)
    {
        game.states[STATE_PLAY].RemoveClient(data);
    });

    this.socket.on('chat', function(data)
    {
        game.states[STATE_PLAY].AddChatMessage(data.id, data.msg);
    });

    this.socket.on('info', function(data)
    {
        game.AddInfo(data.msg);
    });

    this.socket.on('accelerate_start', function(data)
    {
        game.states[STATE_PLAY].AccelerateStart(data.id, data.it);
    });

    this.socket.on('accelerate_stop', function(data)
    {
        game.states[STATE_PLAY].AccelerateStop(data.id, data.it);
    });

    this.socket.on('update_shield', function(data)
    {
        game.states[STATE_PLAY].UpdateShield(data.id, data.shield);
    });

    this.socket.on('new_bullet', function(data)
    {
        game.states[STATE_PLAY].AddBullet(data.id, data.x, data.y, data.fx, data.fy, data.rotation, data.sprite);
    });

    this.socket.on('remove_bullet', function(data)
    {
        game.states[STATE_PLAY].RemoveBullet(data.id);
    });

    this.socket.on('destroy_player', function(data)
    {
        game.states[STATE_PLAY].DestroyPlayer(data);
    });

    this.socket.on('score', function(data)
    {
        game.states[STATE_PLAY].SetScore(data.id, data.score);
    });

    this.socket.on('new_mineral', function(data)
    {
        game.states[STATE_PLAY].AddMineral(data.id, data.type, data.x, data.y);
    });

    this.socket.on('remove_mineral', function(data)
    {
        game.states[STATE_PLAY].RemoveMineral(data.id, data.clientID);
    });

    this.socket.on('mineral_info', function(data)
    {
        game.states[STATE_PLAY].myMinerals =
        [
            data.copperium,
            data.silverium,
            data.goldinium,
            data.mithrilium
        ];
    });

    this.socket.on('space_pong', function(data)
    {
        game.ping = Date.now() - game.latency;
    });
}