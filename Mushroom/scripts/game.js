/**
 * Created by Mariusz on 03.12.2016.
 */

var game = {
    width: 1280,
    height: 720,
    offset: 0,

    fps: 60,

    canvas: null,
    context: null,
    lastTime: null,
    acc: 0.0,

    state: null,
    meter: null,
    ratio: 1.0,

    start: function() {
        this.canvas = document.getElementById('surface');
        this.context = this.canvas.getContext('2d');

        this.meter = new FPSMeter({
            interval:  100,     // Update interval in milliseconds.
            smoothing: 10,      // Spike smoothing strength. 1 means no smoothing.
            show:      'fps',   // Whether to show 'fps', or 'ms' = frame duration in milliseconds.
            toggleOn:  'click', // Toggle between show 'fps' and 'ms' on this event.
            decimals:  0,       // Number of decimals in FPS number. 1 = 59.9, 2 = 59.94, ...
            maxFps:    75,      // Max expected FPS value.
            threshold: 100,     // Minimal tick reporting interval in milliseconds.

            // Meter position
            position: 'absolute', // Meter position.
            zIndex:   10,         // Meter Z index.
            left:     '5px',      // Meter left offset.
            top:      '5px',      // Meter top offset.
            right:    'auto',     // Meter right offset.
            bottom:   'auto',     // Meter bottom offset.
            margin:   '0 0 0 0',  // Meter margin. Helps with centering the counter when left: 50%;

            // Theme
            theme: 'transparent', // Meter theme. Build in: 'dark', 'light', 'transparent', 'colorful'.
            heat:  1,      // Allow themes to use coloring by FPS heat. 0 FPS = red, maxFps = green.

            // Graph
            graph:   1, // Whether to show history graph.
            history: 20 // How many history states to show in a graph.
        });

        this.changeState(load);

        onResize();
        window.addEventListener('resize', onResize);
        this.canvas.addEventListener('mousedown', onMouseDown);

        window.requestAnimationFrame(onAnimationFrame);
    },

    mouseDown: function(button, x, y) {
        if (this.state && this.state.mouseDown) {
            var invRatio = 1.0 / this.ratio;

            this.state.mouseDown(button, x * invRatio, y * invRatio);
        }
    },

    changeState: function(newState) {
        if (this.state) {
            this.state.release();
        }

        this.state = newState;

        this.state.init();
    },

    loop: function(timeStamp) {
        this.acc += (this.lastTime ? (timeStamp - this.lastTime) : 0.0) * 0.001;
        this.lastTime = timeStamp;

        while (this.acc >= (1.0 / this.fps)) {
            this.update(1.0 / this.fps);
            this.acc -= (1.0 / this.fps);
        }

        this.render(this.context);

        this.meter.tick();
        window.requestAnimationFrame(onAnimationFrame);
    },

    update: function(deltaTime) {
        if (this.state) {
            this.state.update(deltaTime);
        }
    },

    render: function(context) {
        context.fillStyle = 'cornflowerblue';

        if (this.state) {
            context.save();
            context.scale(this.ratio, this.ratio);
            context.fillRect(0, 0, this.width, this.height);
            this.state.render(context);
            context.restore();
        }
    },

    resize: function(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;

        this.ratio = width / this.width;
        //if (this.canvas.height > height) {
            this.height = this.canvas.height * (1.0 / this.ratio);
        //}
       // this.offset = (height - this.height) * (this.ratio);
    }
};

function onAnimationFrame(timeStamp) {
    game.loop(timeStamp);
}

function onResize() {
    game.resize(window.innerWidth, window.innerHeight);
}

function onMouseDown(event) {
    game.mouseDown(event.buttons, event.clientX, event.clientY);
}