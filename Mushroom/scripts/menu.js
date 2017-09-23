/**
 * Created by Mariusz on 03.12.2016.
 */

var menu = {
    shroom: null,
    frame: 0,
    time: 0,

    angle: 0.0,

    labels: [
        { text: 'Free Run' },
        { text: 'Options' },
        { text: 'Quit' }
    ],

    init: function() {
        this.shroom = content.resources['shroom'];
    },

    update: function(deltaTime) {
        this.time += deltaTime;
        while (this.time > 0.05) {
            this.frame = (this.frame + 1) % 12;
            this.time -= 0.05;
        }

        this.angle += deltaTime;
        while (this.angle > Math.PI * 2.0) {
            this.angle -= Math.PI * 2.0;
        }
    },

    mouseDown: function(button, x, y) {

        var i;
        var metrics;
        for (i = 0; i < this.labels.length; ++i) {
            game.context.font = '32px Verdana';
            metrics = game.context.measureText(this.labels[i].text);
            metrics.width *= game.ratio;
            metrics.height *= game.ratio;

            if (x > game.width / 2 - metrics.width / 2 && x < game.width / 2 + metrics.width / 2 &&
                y > game.height / 2 + i * 40 && y < game.height / 2 + i * 40 + 32) {
                switch (i) {
                    case 0:
                        game.changeState(play);
                        break;
                }
            }
        }
    },

    render: function(context) {
        var frame = this.frame;
        if (frame >= 7) {
            frame = 5 - (frame - 7);
        }

        context.fillStyle = '#4475CD';

        var radius = Math.sqrt(((game.width * game.width) / 4) + ((game.height * game.height) / 4)) * 1.02;
        var step = Math.PI / 4.0;

        var i;
        for (i = 0.0; i < Math.PI * 2.0; i += step) {
            context.beginPath();
            context.moveTo(game.width / 2, game.height / 2);
            context.lineTo(game.width / 2 + Math.cos(this.angle + i) * radius,
                game.height / 2 + Math.sin(this.angle + i) * radius);
            context.lineTo(game.width / 2 + Math.cos(this.angle + i + step * 0.5) * radius,
                game.height / 2 + Math.sin(this.angle + i + step * 0.5) * radius);
            context.fill();
        }

        context.drawImage(this.shroom, 200 * frame, 0, 200, 200,
            game.width / 2 - 100, game.height / 2 - 200, 200, 200);

        context.fillStyle = context.strokeStyle = '#222';
        context.textAlign = 'center';
        context.font = '32px Verdana';
        for (i = 0; i < this.labels.length; ++i) {
            if (game.ratio < 0.75) {
                context.fillText(this.labels[i].text, game.width * 0.5, game.height * 0.5 + 30 + i * 40);
            } else {
                context.strokeText(this.labels[i].text, game.width * 0.5, game.height * 0.5 + 30 + i * 40);
            }
        }
    },

    release: function() {

    }
};