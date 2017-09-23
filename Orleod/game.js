
function Game()
{
    this.canvas        = document.getElementById('surface');
    this.context       = this.canvas.getContext('2d');
    this.lastFrameTime = 17;
    
    this.GameLoop = function()
    {
        var t = (new Date()).getTime();
        
        if (IsContentLoaded())
        {
            this.canvas.width = this.canvas.width;
            
            this.context.drawImage(img_backgrounds[0], 0, 0, 800, 600, 0, 0, 800, 600);
            this.context.drawImage(img_ships[0], 0, 0, 128, 128, 400 - 64, 300 - 64, 128, 128);
            
            this.context.drawImage(img_fires[0], 0, 0, 128, 128, 400 - 64, 300 - 64, 128, 128);
        }
        else
        {
           // this.canvas.width = this.canvas.width;
            
            this.context.font = '12px Verdana';
            this.context.textAlign = 'center';
            this.context.fillText(Math.floor(content_counter / CONTENT_SIZE * 100) + '%', this.canvas.width / 2, this.canvas.height / 2);
        }
        
        setTimeout(this.GameLoop, 17 - this.lastFrameTime);
        
        this.lastFrameTime = (new Date()).getTime() - t;
    }
}