/* 
    Map
    prefix = m / M
*/

var MIN_MAP_WIDTH  = 25;
var MIN_MAP_HEIGHT = 19;

var LAYER_GROUND = 0;
var LAYER_MASK   = 1;
var LAYER_FRINGE = 2;
var LAYER_COUNT  = 3;

var TILE_NONE  = 0;
var TILE_BLOCK = 1;

var map_tiles      = [];
var map_attributes = [];

function Map()
{
    this.tiles      = [];
    this.attributes = [];
    
    for (var l = 0; l < LAYER_COUNT; l++)
    {
        this.tiles[l] = [];
        for (var y = 0; y < MIN_MAP_HEIGHT; y++)
        {
            this.attributes[y] = [];
            this.tiles[l][y] = [];
            for (var x = 0; x < MIN_MAP_WIDTH; x++)
            {
                this.tiles[l][y][x] = [ 0, 0, 0 ];
            }
        }
    }
    
    for (var y = 0; y < MIN_MAP_HEIGHT; y++)
    {
        this.attributes[y] = [];
        for (var x = 0; x < MIN_MAP_WIDTH; x++)
        {
            this.attributes[y][x] = TILE_NONE;
        }
    }
    
    this.LoadDefault = function()
    {
        for (var y = 0; y < MIN_MAP_HEIGHT; y++)
        {
            for (var x = 0; x < MIN_MAP_WIDTH; x++)
            {
                this.tiles[LAYER_GROUND][y][x] = [ 0, 6, 1 ];
            }
        }
        
        this.tiles[LAYER_MASK][5][7] = [ 0, 7, 13 ];
        this.attributes[5][7] = TILE_BLOCK;
        
        this.tiles[LAYER_FRINGE][1][9] = [ 0, 9, 6 ];
        this.tiles[LAYER_FRINGE][1][9] = [ 0, 9, 6 ];
        this.tiles[LAYER_FRINGE][1][10] = [ 0, 10, 6 ];
        this.tiles[LAYER_FRINGE][1][11] = [ 0, 11, 6 ];
        
        this.tiles[LAYER_FRINGE][2][8] = [ 0, 8, 7 ];
        this.tiles[LAYER_FRINGE][2][9] = [ 0, 9, 7 ];
        this.tiles[LAYER_FRINGE][2][10] = [ 0, 10, 7 ];
        this.tiles[LAYER_FRINGE][2][11] = [ 0, 11, 7 ];
        this.tiles[LAYER_FRINGE][2][12] = [ 0, 12, 7 ];
        
        this.tiles[LAYER_FRINGE][3][8] = [ 0, 8, 8 ];
        this.tiles[LAYER_FRINGE][3][9] = [ 0, 9, 8 ];
        this.tiles[LAYER_FRINGE][3][10] = [ 0, 10, 8 ];
        this.tiles[LAYER_FRINGE][3][11] = [ 0, 11, 8 ];
        this.tiles[LAYER_FRINGE][3][12] = [ 0, 12, 8 ];
        
        this.tiles[LAYER_FRINGE][3][8] = [ 0, 8, 9 ];
        this.tiles[LAYER_FRINGE][3][9] = [ 0, 9, 9 ];
        this.tiles[LAYER_FRINGE][3][10] = [ 0, 10, 9 ];
        this.tiles[LAYER_FRINGE][3][11] = [ 0, 11, 9 ];
        this.tiles[LAYER_FRINGE][3][12] = [ 0, 12, 9 ];
        
        this.tiles[LAYER_FRINGE][4][9] = [ 0, 9, 10 ];
        this.tiles[LAYER_FRINGE][4][10] = [ 0, 10, 10 ];
        this.tiles[LAYER_FRINGE][4][11] = [ 0, 11, 10 ];
        this.tiles[LAYER_MASK][4][12] = [ 0, 12, 10 ];
        
        this.tiles[LAYER_MASK][5][9] = [ 0, 9, 11 ];
        this.tiles[LAYER_MASK][5][10] = [ 0, 10, 11 ];
        this.tiles[LAYER_MASK][5][11] = [ 0, 11, 11 ];
        this.tiles[LAYER_MASK][5][12] = [ 0, 12, 11 ];
        
        this.attributes[5][10] = TILE_BLOCK;
        this.attributes[5][11] = TILE_BLOCK;
    };
    
    this.RenderMask = function(context)
    {
        for (var l = 0; l < LAYER_FRINGE; l++)
        {
            for (var y = 0; y < MIN_MAP_HEIGHT; y++)
            {
                for (var x = 0; x < MIN_MAP_WIDTH; x++)
                {
                    var tile = this.tiles[l][y][x];
                    if (tile[1] > 0 && tile[2] > 0)
                    {
                        context.drawImage(img_tilesets[tile[0]], tile[1] * 32, tile[2] * 32, 32, 32, x * 32, y * 32, 32, 32);
                    }
                }
            }
        }
    };
    
    this.RenderFringe = function(context)
    {
        for (var y = 0; y < MIN_MAP_HEIGHT; y++)
        {
            for (var x = 0; x < MIN_MAP_WIDTH; x++)
            {
                var tile = this.tiles[LAYER_FRINGE][y][x];
                if (tile[1] > 0 && tile[2] > 0)
                {
                    context.drawImage(img_tilesets[tile[0]], tile[1] * 32, tile[2] * 32, 32, 32, x * 32, y * 32, 32, 32);
                }
            }
        }
    };
}

var map = new Map();