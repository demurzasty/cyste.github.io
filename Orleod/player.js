
function Player()
{
    this.x          = 1500.0;
    this.y          = 750.0;
    this.ship       = 0;
    this.fx         = 0.0;
    this.fy         = 0.0;
    this.accelerate = 0.0;
    this.rotation   = 0.0;
    this.fireAnim   = 0.0;
    this.fireLook   = 0.0;
    this.reload     = 0;
    
    this.Update = function(deltaTime)
    {
        if (keys[32]) // Space 
        {
            if (this.reload <= 0.0)
            {
                var bullet = new Bullet();
                
                bullet.x = this.x + Math.cos(this.rotation) * 23;
                bullet.y = this.y + Math.sin(this.rotation) * 23;
                
                bullet.fx = this.fx;
                bullet.fy = this.fy;
                
                bullet.rotation = this.rotation;
                
                bullets.push(bullet);
                this.reload = 1.0;
            }
        }
        
        if (this.reload > 0.0)
            this.reload -= deltaTime * 5.0;
        
        if (keys[37]) // Left Arrow
            this.rotation -= deltaTime * Math.PI;
        else if (keys[39]) // Right Arrow
            this.rotation += deltaTime * Math.PI;
            
        
        if (keys[38]) // Up Arrow
            this.accelerate = (keys[122] || keys[90]) ? 300.0 : 150.0;
        //else if (keys[40]) // Down Arrow
        //    this.accelerate = -5.0;
        else
            this.accelerate = 0.0;
        
        if (this.accelerate > 0.0)
        {
            if (this.accelerate == 150.0 && this.fireLook > 1.0)
                this.fireLook = Math.max(this.fireLook - deltaTime * 1.5, 0.0);
            else
                this.fireLook = Math.min(this.fireLook + deltaTime * 2.0 * (this.accelerate / 150.0), this.accelerate / 150.0);
        }
        else
            this.fireLook = Math.max(this.fireLook - deltaTime * 1.5, 0.0);
        
        this.fx += Math.cos(this.rotation) * this.accelerate * deltaTime;
        this.fy += Math.sin(this.rotation) * this.accelerate * deltaTime;
        
        this.x += this.fx * deltaTime;
        this.y += this.fy * deltaTime;
        
        if (this.x < 0)
        {
            this.fx = -this.fx * 0.1;
            this.x = 0;
        }
        else if (this.x > 3000)
        {
            this.fx = -this.fx * 0.1;
            this.x = 3000;
        }
        
        if (this.y < 0)
        {
            this.fy = -this.fy * 0.1;
            this.y = 0;
        }
        else if (this.y > 1500)
        {
            this.fy = -this.fy * 0.1;
            this.y = 1500;
        }
        
        for (var i = 0; i < asteroids.length; i++)
        {
            var distX = asteroids[i].x - this.x;
            var distY = asteroids[i].y - this.y;
            
            var distance = Math.sqrt(distX * distX + distY * distY);
            
            if (distance < asteroids[i].size + 24)
                gameOver = true;
        }
        
        this.fireAnim += deltaTime;
        while (this.fireAnim > Math.PI * 2.0)
            this.fireAnim -= Math.PI * 2.0;
    }
    
    this.Render = function()
    {
        context.save();
        
        var img = img_ships[this.ship];
        
        context.translate(this.x - cameraX, this.y - cameraY);
        
        context.rotate(this.rotation);
        
        context.drawImage(img, 0, 0, img.width, img.height, -img.width / 2, -img.height / 2, img.width, img.height);
        
        if (this.fireLook > 0.0)
        {
            context.globalAlpha = this.fireLook;
            
            var s = this.fireLook + Math.sin(this.fireAnim * 100.0) * 0.1;
            
            context.scale(s, s);
            
            context.rotate(Math.cos(this.fireAnim * 100.0) * 0.05 * this.fireLook);
            
            context.drawImage(img_fires[this.ship], 0, 0, img.width, img.height, -img.width / 2, -img.height / 2, img.width, img.height);
        }
        
        context.restore();
        
        context.font = '12px Verdana';
        context.textAlign = 'left';
        context.fillStyle = 'white';
        context.fillText('Speed: ' + Math.floor(Math.sqrt(this.fx * this.fx + this.fy * this.fy)), 0.0, 12.0);
        context.fillText('Asteroids: ' + asteroids.length, 0.0, 24.0);
    }
}

var player = new Player();