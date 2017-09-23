/* 
    NPC
    prefix = n / N
*/

var MIN_TIME_FOR_NEXT_STEP = 2.0;
var MAX_TIME_FOR_NEXT_STEP = 7.0;

var AI_IDLE   = 0; // random move
var AI_TALK   = 1; // no move
var AI_FOLLOW = 2; 
var AI_ATTACK = 3;

var REPUTATION_FRIENDLY  = 0;
var REPUTATION_AGGRESIVE = 1;

function NPC()
{
    this.name   = 'unknown';
    this.x      = 0;
    this.y      = 0;
    this.ox     = 0.0;
    this.oy     = 0.0;
    this.dir    = DIR_DOWN;
    this.sprite = 12;
    this.step   = 1;
    this.move   = false;
    this.speed  = 64;
    this.state  = AI_IDLE;
    this.type   = REPUTATION_FRIENDLY;
    
    this.nextStep = MIN_TIME_FOR_NEXT_STEP + Math.random() * (MAX_TIME_FOR_NEXT_STEP - MIN_TIME_FOR_NEXT_STEP);
    
    this.Move = function(dir)
    {
        if (!this.move)
        {
            this.dir = dir;
            
            var x = this.x + DIR_VEC[dir][0];
            var y = this.y + DIR_VEC[dir][1];
            
            if (x < 0 || x >= MIN_MAP_WIDTH || y < 0 || y >= MIN_MAP_HEIGHT)
                return;
            
            if (map.attributes[y][x] == TILE_BLOCK)
                return;
            
            for (var j = 0; j < npcs.length; j++)
                if (this != npcs[j] && npcs[j].x == x && npcs[j].y == y)
                    return;
                
            if (player.x == x && player.y == y)
                return;
            
            this.step = (this.step == 1) ? -1 : 1;
            
            this.x = x;
            this.y = y;
            
            this.ox = -DIR_VEC[dir][0] * 32;
            this.oy = -DIR_VEC[dir][1] * 32;
            
            this.move = true;
        }
    }
    
    this.Update = function(deltaTime)
    {
        this.nextStep -= deltaTime;
        
        if (this.nextStep < 0.0)
        {
            var n = Math.random() * 100.0;
            
            if (n < 25.0)
                this.Move(DIR_DOWN);
            else if (n < 50.0)
                this.Move(DIR_UP);
            else if (n < 75.0)
                this.Move(DIR_LEFT);
            else
                this.Move(DIR_RIGHT);
            
            this.nextStep = MIN_TIME_FOR_NEXT_STEP + Math.random() * (MAX_TIME_FOR_NEXT_STEP - MIN_TIME_FOR_NEXT_STEP);
        }
        
        this.ox += DIR_VEC[this.dir][0] * deltaTime * this.speed;
        this.oy += DIR_VEC[this.dir][1] * deltaTime * this.speed;
        
        switch (this.dir)
        {
            case DIR_DOWN:
                if (this.oy > 0)
                    this.move = false;
                break;
            case DIR_LEFT:
                if (this.ox < 0)
                    this.move = false;
                break;
            case DIR_RIGHT:
                if (this.ox > 0)
                    this.move = false;
                break;
            case DIR_UP:
                if (this.oy < 0)
                    this.move = false;
                break;
        }
        
        if (!this.move)
        {
            this.ox = 0.0;
            this.oy = 0.0;
        }
    }
    
    this.Render = function(context, y)
    {
        if (this.y == y)
        {
            var sx = GetSpriteSourceX(this.sprite) + 32;
            if (this.move && (Math.abs(this.ox) < 16.0) && (Math.abs(this.oy) < 16.0))
                sx += this.step * 32;
            var sy = GetSpriteSourceY(this.sprite) + this.dir * 48;
            context.drawImage(img_sprites[Math.floor(this.sprite / 8)], sx, sy, 32, 48, this.x * 32 + this.ox, this.y * 32 + this.oy - 16, 32, 48);
        }
    }
}

var npcs = [];

function InitNPC()
{
    var npc = new NPC();
    npc.name = 'Edgar';
    npc.x    = 8;
    npc.y    = 8;
    npcs.push(npc);
    
    npc = new NPC();
    npc.name   = 'Laurence';
    npc.x      = 3;
    npc.y      = 8;
    npc.sprite = 0;
    npcs.push(npc);
}

