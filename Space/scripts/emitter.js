/**
 * Created by Mariusz on 11/7/2016.
 */

function Emitter(x, y) {
    this.x = x;
    this.y = y;
    this.frequency = 2000.0;
    this.angle = 0.0;
    this.strength = 100.0;
    this.spread = Math.PI * 0.0625;

    this.time = 0.0;
}

Emitter.prototype = {
    update: function(deltaTime) {
        var period = (1.0 / this.frequency);

        this.time += deltaTime;
        while (this.time > period) {
           // var particle = new Particle(this.x, this.y);
            var spread = Math.random() * this.spread - this.spread * 0.5;
            var angle = this.angle + spread;
            var strength = this.strength * 0.5 + (Math.random() * this.strength);
            var dx = Math.cos(angle) * strength;
            var dy = Math.sin(angle) * strength;
            particleSystem.emit(this.x, this.y, dx, dy);

            this.time -= period;
        }
    },

    render: function(context) {
        /*
        context.fillStyle = 'yellow';
        context.beginPath();
        context.arc(this.x, this.y, 3.0, 0.0, Math.PI * 2.0);
        context.fill();
        */
    }
};