var socket    = null;
var canvas    = document.getElementById('surface');
var context   = canvas.getContext('2d');
var player    = null; // me
var gameState = GAME_STATE_LOADING;

function addMessage(message) 
{
    var text = document.createTextNode(message),
        el = document.createElement('li'),
        messages = document.getElementById('messages');

    el.appendChild(text);
    messages.appendChild(el);
}

function SetGameState(state)
{
    gameState = state;

    switch (gameState)
    {
        case GAME_STATE_LOADING:
            break;
        case GAME_STATE_CONNECTING:
            socket = new WebSocket('ws://' + IP + ':' + PORT);

            socket.onopen = function()
            {
                SetGameState(GAME_STATE_PLAY);
            };
            break;
        case GAME_STATE_DISCONNECTED:

            break;
        case GAME_STATE_PLAY:
            break;
    }

}

function GameLoop()
{
    switch (gameState)
    {
        case GAME_STATE_LOADING:
            canvas.width = canvas.width;
            
            context.font = '12px Verdana';
            context.textAlign = 'center';
            context.fillText(Math.floor(content_counter / CONTENT_SIZE * 100) + '%', canvas.width / 2,canvas.height / 2);

            if (IsContentLoaded())
                SetGameState(GAME_STATE_CONNECTING);
            break;
        case GAME_STATE_CONNECTING:
            canvas.width = canvas.width;
            
            context.font = '12px Verdana';
            context.textAlign = 'center';
            context.fillText('Connecting...', canvas.width / 2, canvas.height / 2);
            break;
        case GAME_STATE_DISCONNECTED:
            canvas.width = canvas.width;
            
            context.font = '12px Verdana';
            context.textAlign = 'center';
            context.fillText('Disconnected', canvas.width / 2, canvas.height / 2);
            break;
        case GAME_STATE_PLAY:
            canvas.width = canvas.width;
            break;
    }

    setTimeout(GameLoop, 17);
}

window.onload = function() 
{
    LoadContent();
    
    window.addEventListener('keydown', KeyDown, false);
    window.addEventListener('keyup', KeyUp, false);
    canvas.addEventListener('mousemove', MouseMove, false);
    canvas.addEventListener('mousedown', MouseDown, false);
    canvas.addEventListener('mouseup', MouseUp, false);

    player = new Player(0);

    GameLoop();
};