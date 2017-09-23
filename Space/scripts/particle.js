/**
 * Created by Mariusz on 11/7/2016.
 */

function Particle() {
    this.x = 0.0;
    this.y = 0.0;
    this.dx = 0.0;
    this.dy = 0.0;
    this.color = '#ffffff';
    this.use = false;

    //var red = 127 + ((Math.random() * 128) | 0);
    //var green = 127 + ((Math.random() * 128) | 0);
    //var blue = 127 + ((Math.random() * 128) | 0);
    //this.color = '#' + red.toString(16) + green.toString(16) + blue.toString(16);
}

Particle.prototype = {
    update: function(deltaTime) {
        var i;
        var sx = ((this.x / Sector.size) | 0);
        var sy = ((this.y / Sector.size) | 0);

        /*
        var diffX = particleSystem.mouseField.x - this.x;
        var diffY = particleSystem.mouseField.y - this.y;
        if (Math.sqrt(diffX * diffX + diffY * diffY) < particleSystem.mouseField.distance) {

        }*/

        if (particleSystem.mouseField.working) {
            particleSystem.mouseField.updateParticle(this, deltaTime);
        }

        if (sx >= 0 && sx < particleSystem.sectors.length && sy >= 0 && sy < particleSystem.sectors[0].length) {
            var sector = particleSystem.sectors[sx][sy];
            for (i = 0; i < sector.fields.length; ++i) {
                particleSystem.fields[sector.fields[i]].updateParticle(this, deltaTime);
            }
        }

        this.x += this.dx * deltaTime;
        this.y += this.dy * deltaTime;
    },

    render: function() {
        renderer.renderPoint(this.x, this.y,this.color);
        //context.fillStyle = this.color;
        //context.fillRect(this.x, this.y, 1.0, 1.0);

        //context.fillStyle = this.color;
        //context.beginPath();
        //context.arc(this.x, this.y, 1.5, 0.0, Math.PI * 2.0);
        //context.fill();
    }
};