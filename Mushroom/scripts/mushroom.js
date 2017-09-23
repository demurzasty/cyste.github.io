/**
 * Created by Mariusz on 03.12.2016.
 */

function Mushroom() {
    this.image = content.resources['shroom'];

    this.x = 0.0;
    this.y = 0.0;
    this.dy = 0.0;
    this.speed = 300.0;

    this.frame = 0;
    this.animation = null;
    this.time = 0.0;
    this.frameDir = 1;

    this.setAnimation('running');
}

Mushroom.prototype = {
    animations: [
        { name: 'standing', row: 0, next: 'standing', speed: 20.0, frames: [ 3, 4, 5, 6, 5, 4, 3, 2, 1, 0, 1, 2 ] },
        { name: 'running',  row: 1, next: 'running',  speed: 20.0, frames: [ 6, 5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5 ] },
        { name: 'idle',     row: 2, next: 'standing', speed: 20.0, frames: [ 0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1 ] },
        { name: 'jump',     row: 1, next: 'falling',  speed: 20.0, frames: [ 3, 4, 5, 6 ] },
        { name: 'falling',  row: 1, next: 'falling',  speed: 10.0, frames: [ 6 ] }
    ],

    setAnimation: function(name, overwrite) {
        if (overwrite === undefined) {
            overwrite = true;
        }

        var i;
        for (i = 0; i < this.animations.length; ++i) {
            if (this.animations[i].name == name) {
                if (overwrite || this.animations[i] != this.animation) {
                    this.animation = this.animations[i];
                    this.frame = 0;
                    this.time = 0.0;
                }
                return;
            }
        }
    },

    jump: function() {
        if (Math.abs(this.dy) < 0.001) {
            this.dy = 16.0;
            this.setAnimation('jump');
        }
    },

    update: function(deltaTime) {
        this.time += deltaTime;

        while (this.time >= 1.0 / this.animation.speed) {
            this.time -= 1.0 / this.animation.speed;

            this.frame++;
            if (this.frame >= this.animation.frames.length) {
                this.setAnimation(this.animation.next);
            }
        }

        this.x += this.speed * deltaTime;

        this.dy -= 50.0 * deltaTime;
        this.y += this.dy;// * deltaTime;
        if (this.y < 0.0) {
            this.y = 0.0;
            this.dy = 0.0;

            this.setAnimation('running', false);
        }
    },

    renderShadow: function(context) {
        context.beginPath();
        context.scale(2.0, 1.0);
        context.fillStyle = '#111';
        context.globalAlpha = 0.3;
        context.arc(50.0, game.height - 156, 16.0, 0.0, Math.PI * 2.0, false);
        context.fill();
        context.scale(0.5, 1.0);
        context.globalAlpha = 1.0;
    },

    render: function(context) {
        var frame = this.animation.frames[this.frame];

       // if (this.animation.twoSided && frame > this.animation.frameEnd) {
        //    frame = (this.animation.frameEnd) - (frame - this.animation.frameEnd);
        //}

        context.drawImage(this.image, frame * 200, this.animation.row * 200, 200, 200,
            0, game.height - this.y - 356, 200, 200);
    }
};