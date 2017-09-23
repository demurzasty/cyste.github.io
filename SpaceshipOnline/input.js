var keys   = [];
var mouseX = 0;
var mouseY = 0;

function KeyDown(e)
{
    keys[e.keyCode] = true;
    
    if (game.states[game.state].KeyDown)
        game.states[game.state].KeyDown(e.keyCode);
    
    if (game.states[game.state].form)
        game.states[game.state].form.KeyDown(e.keyCode);
}

function KeyUp(e)
{
    keys[e.keyCode] = false;
    
    if (game.states[game.state].form)
        game.states[game.state].form.KeyUp(e.keyCode);
}

function MouseMove(e)
{
    var rect = game.canvas.getBoundingClientRect();
    
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    
    if (game.states[game.state].form)
        game.states[game.state].form.MouseMove(mouseX, mouseY);
}

function MouseDown(e)
{
    var rect = game.canvas.getBoundingClientRect();
    
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    
    if (game.states[game.state].form)
        game.states[game.state].form.MouseDown(e.button, mouseX, mouseY);
}

function MouseUp(e)
{
    var rect = game.canvas.getBoundingClientRect();
    
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    
    if (game.states[game.state].form)
        game.states[game.state].form.MouseUp(e.button, mouseX, mouseY);
}

function InitInput()
{
    window.addEventListener('keydown', KeyDown, false);
    window.addEventListener('keyup',   KeyUp,   false);
    
    window.addEventListener('mousemove', MouseMove, false);
    window.addEventListener('mousedown', MouseDown, false);
    window.addEventListener('mouseup',   MouseUp,   false);
    
    //game.canvas.addEventListener('mousemove', MouseMove, false);
   // game.canvas.addEventListener('mousedown', MouseDown, false);
   // game.canvas.addEventListener('mouseup',   MouseUp,   false);
}