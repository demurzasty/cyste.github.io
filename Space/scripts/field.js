/**
 * Created by Mariusz on 11/7/2016.
 */

function Field(x, y) {
    this.x = x;
    this.y = y;
    this.distance = 200.0;
    this.strength = 200.0;
    this.working = true;
}

Field.prototype = {
    update: function(deltaTime) {
        if (this.working) {
            var i;
            for (i = 0; i < particleSystem.particles.length; ++i) {
                var particle = particleSystem.particles[i];
                if (particle && particle.use) {
                    var distance = Math.sqrt((particle.x - this.x) * (particle.x - this.x) + (particle.y - this.y) * (particle.y - this.y));
                    if (distance < this.distance) {
                        var strength = this.strength * ((this.distance / distance));
                        var angle = Math.atan2(this.y - particle.y, this.x - particle.x);
                        particle.dx += Math.cos(angle) * deltaTime * strength;
                        particle.dy += Math.sin(angle) * deltaTime * strength;
                    }
                }
            }
        }
    },

    updateParticle: function(particle, deltaTime) {

        if (particle && particle.use) {
            var distance = Math.sqrt((particle.x - this.x) * (particle.x - this.x) + (particle.y - this.y) * (particle.y - this.y));
            if (distance < this.distance) {
                var strength = this.strength * (this.distance / distance) ;
                var angle = Math.atan2(this.y - particle.y, this.x - particle.x);
                particle.dx += Math.cos(angle) * deltaTime * strength;
                particle.dy += Math.sin(angle) * deltaTime * strength;
            }
        }
    },
    
    render: function(context) {
        /*
        context.fillStyle = '#111111';
        context.beginPath();
        context.arc(this.x, this.y, this.distance, 0.0, Math.PI * 2.0);
        context.fill();
        */

        //context.fillStyle = 'orange';
        //context.beginPath();
       // context.arc(this.x, this.y, 3.0, 0.0, Math.PI * 2.0);
        //context.fill();
    }
};