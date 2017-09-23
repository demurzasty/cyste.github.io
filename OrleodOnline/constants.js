
var IP   = '192.168.1.12'; //'83.28.222.53';
var PORT = '8001';

var MAX_IMG_SPRITES    = 20;
var MAX_IMG_PAPERDOLLS = 1;
var MAX_IMG_TILESETS   = 1;
var MAX_IMG_FACES      = 1;
var MAX_IMAGES         = MAX_IMG_SPRITES + MAX_IMG_PAPERDOLLS + MAX_IMG_TILESETS + MAX_IMG_FACES + 1 + 1; // + icons + interface

var CONTENT_SIZE       = MAX_IMAGES;

var GAME_STATE_LOADING      = 0;
var GAME_STATE_CONNECTING   = 1;
var GAME_STATE_DISCONNECTED = 2;
var GAME_STATE_PLAY         = 3;

var DIR_DOWN  = 0;
var DIR_LEFT  = 1;
var DIR_RIGHT = 2;
var DIR_UP    = 3;

var DIR_VECTORS = [ { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 } ];

var FIXED_TIME_STEP = 1.0 / 60.0;