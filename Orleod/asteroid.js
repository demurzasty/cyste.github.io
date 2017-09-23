
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
    this.x        = x;
    this.y        = y;
    this.fx       = Math.cos(rotation);
    this.fy       = Math.sin(rotation);
    this.lvl      = lvl;
    this.rotation = rotation;
    this.image    = GetRandomInt(ASTEROID_TYPES[lvl][0], ASTEROID_TYPES[lvl][1]);
    this.size     = ASTEROID_TYPES[lvl][2];
    this.speed    = 70;
    
    this.Update = function(deltaTime)
    {
        this.x += this.fx * this.speed * deltaTime;
        this.y += this.fy * this.speed * deltaTime;
        
        if (this.x < 0)
        {
            this.fx = -this.fx;
            this.x = 0;
        }
        else if (this.x > 3000)
        {
            this.fx = -this.fx;
            this.x = 3000;
        }
        
        if (this.y < 0)
        {
            this.fy = -this.fy;
            this.y = 0;
        }
        else if (this.y > 1500)
        {
            this.fy = -this.fy;
            this.y = 1500;
        }
        
        this.rotation += Math.PI * deltaTime;
    }
    
    this.Render = function()
    {
        context.save();
        
        var img = img_asteroids[this.image];
        
        context.translate(this.x - cameraX, this.y - cameraY);
        
        context.rotate(this.rotation);
        
        context.drawImage(img, 0, 0, img.width, img.height, -img.width / 2, -img.height / 2, img.width, img.height);
        
        context.restore();
    }
}

var asteroids = [];
