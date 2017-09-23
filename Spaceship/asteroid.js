
var MAX_ASTEROID_LVL = 4;

var ASTEROID_TYPES = 
[
    [ 0, 0, 40.0 ],
    [ 1, 3, 30.0 ],
    [ 4, 6, 24.0 ],
    [ 7, 9, 12.0 ]
];

function GetRandomInt(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Asteroid(x, y, rotation, lvl)
{
    var INITIAL_SPEED = 70;
    
    this.x        = x;
    this.y        = y;
    this.fx       = Math.cos(rotation) * INITIAL_SPEED;
    this.fy       = Math.sin(rotation) * INITIAL_SPEED;
    this.lvl      = lvl;
    this.rotation = rotation;
    this.image    = GetRandomInt(ASTEROID_TYPES[lvl][0], ASTEROID_TYPES[lvl][1]);
    this.size     = ASTEROID_TYPES[lvl][2];
    
    this.AddForce = function(x, y)
    {
        this.fx += x;
        this.fy += y;
    }
    
    this.Update = function(deltaTime)
    {
        this.x += this.fx * deltaTime;
        this.y += this.fy * deltaTime;
        
        if (this.x < 0)
        {
            this.fx = -this.fx;
            this.x = 0;
        }
        else if (this.x > MAP_WIDTH)
        {
            this.fx = -this.fx;
            this.x = MAP_WIDTH;
        }
        
        if (this.y < 0)
        {
            this.fy = -this.fy;
            this.y = 0;
        }
        else if (this.y > MAP_HEIGHT)
        {
            this.fy = -this.fy;
            this.y = MAP_HEIGHT;
        }
        
        this.rotation += Math.PI * deltaTime;
    }
    
    this.Render = function()
    {
        if (this.x + this.size < cameraX || this.x - this.size > cameraX + canvas.width || this.y + this.size < cameraY || this.y - this.size > cameraY + canvas.height) 
            return;
        
        context.save();
        
        var img = img_asteroids[this.image];
        
        context.translate(this.x - cameraX, this.y - cameraY);
        
        context.rotate(this.rotation);
        
        context.drawImage(img, 0, 0, img.width, img.height, -img.width / 2, -img.height / 2, img.width, img.height);
        
        context.restore();
    }
}

var asteroids = [];
