/**
 * Created by Mariusz on 03.12.2016.
 */
var play = {
    mushroom: null,
    ground: null,

    init: function () {
        this.mushroom = new Mushroom();
        this.ground = content.resources['ground'];
    },

    update: function (deltaTime) {
        this.mushroom.update(deltaTime);
    },

    mouseDown: function(button, x, y) {
        this.mushroom.jump();
    },

    render: function (context) {
        var offset = this.mushroom.x & 0xFF;

        var i;
        for (i = 0; i < game.width + 256; i += 256) {
            context.drawImage(this.ground, i - offset, game.height - 256);
        }
        this.mushroom.renderShadow(context);

        this.mushroom.render(context);
    },

    release: function () {

    }
};