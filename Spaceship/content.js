/* 
    Content Manager
*/

var MAX_IMG_SHIPS       = 1;
var MAX_IMG_PLANETS     = 1;
var MAX_IMG_BULLETS     = 1;
var MAX_IMG_BACKGROUNDS = 1;
var MAX_IMG_FIRES       = 1;
var MAX_IMG_ASTEROIDS   = 10;
var MAX_IMG_EFFECTS     = 1;
var MAX_IMAGES          = MAX_IMG_SHIPS + MAX_IMG_PLANETS + MAX_IMG_BULLETS + MAX_IMG_BACKGROUNDS + MAX_IMG_FIRES + MAX_IMG_ASTEROIDS + MAX_IMG_EFFECTS;

var MAX_AUD_MUSIC  = 1;
var MAX_AUD_SOUNDS = 0;
var MAX_AUDIO      = MAX_AUD_MUSIC + MAX_AUD_SOUNDS;

var CONTENT_SIZE = MAX_IMAGES + MAX_AUDIO;

var img_ships       = [];
var img_planets     = [];
var img_bullets     = [];
var img_backgrounds = [];
var img_fires       = [];
var img_asteroids   = [];
var img_effects     = [];

var aud_music  = [];
var aud_sounds = [];

var content_counter = 0;

function ImageOnLoad()
{
    content_counter++;
}

function AudioOnLoad(audio)
{
    if (!audio._loaded)
    {
        content_counter++;
        audio._loaded = true;
    }
}

function IsContentLoaded()
{
    return content_counter == CONTENT_SIZE;
}

function LoadContent()
{
    for (var i = 0; i < MAX_IMG_SHIPS; i++)
    {
        img_ships[i] = new Image();
        img_ships[i].onload = ImageOnLoad;
        img_ships[i].src = 'assets/ships/' + i + '.png';
    }
    
    for (var i = 0; i < MAX_IMG_PLANETS; i++)
    {
        img_planets[i] = new Image();
        img_planets[i].onload = ImageOnLoad;
        img_planets[i].src = 'assets/planets/' + i + '.png';
    }
    
    for (var i = 0; i < MAX_IMG_BULLETS; i++)
    {
        img_bullets[i] = new Image();
        img_bullets[i].onload = ImageOnLoad;
        img_bullets[i].src = 'assets/bullets/' + i + '.png';
    }
    
    for (var i = 0; i < MAX_IMG_BACKGROUNDS; i++)
    {
        img_backgrounds[i] = new Image();
        img_backgrounds[i].onload = ImageOnLoad;
        img_backgrounds[i].src = 'assets/backgrounds/' + i + '.png';
    }
    
    for (var i = 0; i < MAX_IMG_FIRES; i++)
    {
        img_fires[i] = new Image();
        img_fires[i].onload = ImageOnLoad;
        img_fires[i].src = 'assets/fires/' + i + '.png';
    }
    
    for (var i = 0; i < MAX_IMG_ASTEROIDS; i++)
    {
        img_asteroids[i] = new Image();
        img_asteroids[i].onload = ImageOnLoad;
        img_asteroids[i].src = 'assets/asteroids/' + i + '.png';
    }
    
    for (var i = 0; i < MAX_IMG_EFFECTS; i++)
    {
        img_effects[i] = new Image();
        img_effects[i].onload = ImageOnLoad;
        img_effects[i].src = 'assets/effects/' + i + '.png';
    }
    
    for (var i = 0; i < MAX_AUD_MUSIC; i++)
    {
        aud_music[i] = new Audio('assets/music/' + i + '.ogg');
        aud_music[i].addEventListener('canplaythrough', function () { AudioOnLoad(aud_music[i]); }, false);
    }
    
    for (var i = 0; i < MAX_AUD_SOUNDS; i++)
    {
        aud_sounds[i] = new Audio('assets/sounds/' + i + '.ogg');
        aud_sounds[i].addEventListener('canplaythrough', function () { AudioOnLoad(aud_music[i]); }, false);
    }
}