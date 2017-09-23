/* 
    Input
    prefix = i / I
*/

var KEY_LEFT  = 0;
var KEY_UP    = 1;
var KEY_RIGHT = 2;
var KEY_DOWN  = 3;

var keys = [];
var mouseX = 0;
var mouseY = 0;

function KeyDown(e)
{
    keys[e.keyCode] = true;
}

function KeyUp(e)
{
    keys[e.keyCode] = false;
}

function MouseMove(e)
{
    var rect = canvas.getBoundingClientRect();
    
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
}

function MouseDown(e)
{
    var rect = canvas.getBoundingClientRect();
    
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
}

function MouseUp(e)
{
    var rect = canvas.getBoundingClientRect();
    
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
}