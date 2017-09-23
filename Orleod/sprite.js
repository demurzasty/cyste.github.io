/* 
    Sprite
    prefix = s / S
*/

var DIR_DOWN  = 0;
var DIR_LEFT  = 1;
var DIR_RIGHT = 2;
var DIR_UP    = 3;
var DIR_VEC = [ [ 0, 1 ], [ -1, 0 ], [ 1, 0 ], [ 0, -1 ] ];

function GetSpriteSourceX(sprite)
{
    return (sprite % 4) * 96;
}

function GetSpriteSourceY(sprite)
{
    return Math.floor((sprite % 8) / 4) * 192;
}