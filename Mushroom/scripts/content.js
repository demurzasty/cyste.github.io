/**
 * Created by Mariusz on 03.12.2016.
 */

function onImageLoad() {
    content.progress++;
}

var content = {
    /* dictionary */
    resources: { },

    progress: 0,
    count: 0,

    load: function() {
        var i;
        for (i = 0; i < assets.length; ++i) {
            var resource;
            switch (assets[i].type) {
                default:
                    continue;
                case 'image':
                    resource = new Image();
                    resource.onload = onImageLoad;
                    resource.src = assets[i].path;
                    break;
            }
            this.resources[assets[i].name] = resource;
            ++this.count;
        }
    }
};