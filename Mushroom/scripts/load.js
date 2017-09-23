/**
 * Created by Mariusz on 03.12.2016.
 */

var load = {
    init: function() {
        content.load();
    },

    update: function(deltaTime) {
        if (content.progress === content.count) {
            game.changeState(menu);
        }
    },

    render: function(context) {
        context.fillStyle = 'black';
        context.font = '24px Arial';
        context.textAlign = 'center';
        context.fillText('Loading ' + content.progress, game.width / 2, game.height / 2);
    },

    release: function() {

    }
};