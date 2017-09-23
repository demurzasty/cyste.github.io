
function GetSpriteSourceX(sprite)
{
    return (sprite % 4) * 96;
}

function GetSpriteSourceY(sprite)
{
    return Math.floor((sprite % 8) / 4) * 192;
}

function Player(id)
{
    this.id     = id;
    this.x      = 0;
    this.y      = 0;
    this.ox     = 0;
    this.oy     = 0;
    this.dir    = DIR_DOWN;
    this.step   = 1;
    this.moving = false;
    this.sprite = id % 16;

    this.Update = function()
    {
        if (this.moving)
        {
            this.fx += DIR_VECTORS[this.dir] * FIXED_TIME_STEP;
            this.fy += DIR_VECTORS[this.dir] * FIXED_TIME_STEP;

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
                this.ox = 0;
                this.oy = 0;
            }
        }
    };

    this.Render = function(y)
    {
        if (this.y == y)
        {
            var sx = GetSpriteSourceX(this.sprite) + 32;
            if (this.move && (Math.abs(this.ox) < 16.0) && (Math.abs(this.oy) < 16.0))
                sx += this.step * 32;
            var sy = GetSpriteSourceY(this.sprite) + this.dir * 48;
            context.drawImage(img_sprites[Math.floor(this.sprite / 8)], sx, sy, 32, 48, this.x * 32 + this.ox, this.y * 32 + this.oy - 16, 32, 48);
        }
    };
}