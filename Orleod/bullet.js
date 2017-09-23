
function Bullet()
{
    this.x        = 0;
    this.y        = 0;
    this.fx       = 0;
    this.fy       = 0;
    this.rotation = 0;
    this.image    = 0;
    this.speed    = 600;
    this.damage   = 10;
    
    this.Update = function(deltaTime)
    {
        this.x += Math.cos(this.rotation) * this.speed * deltaTime;
        this.y += Math.sin(this.rotation) * this.speed * deltaTime;
        
        this.x += this.fx * deltaTime;
        this.y += this.fy * deltaTime;
    }
    
    this.Render = function()
    {
        context.save();
        
        var img = img_bullets[this.image];
        
        context.translate(this.x - cameraX, this.y - cameraY);
        
        context.rotate(this.rotation);
        
        context.drawImage(img, 0, 0, img.width, img.height, -img.width / 2, -img.height / 2, img.width, img.height);
        
        context.restore();
    }
}

var bullets = [];
