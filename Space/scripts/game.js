/**
 * Created by Mariusz on 11/7/2016.
 */

var LOGIC_FPS = 60;

var game = {
    canvas: null,
    context: null,
    lastTime: null,
    meter: null,
    acc: 0.0,

    mouseField: {
        working: false,
        x: 0,
        y: 0
    },

    update: function(deltaTime) {
        particleSystem.update(deltaTime);
    },

    render: function() {
        //this.context.fillStyle = 'black';
        //this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // particleSystem.render(this.context);

        renderer.render();
    },

    loop: function(timeStamp) {
        var deltaTime = (this.lastTime ? (timeStamp - this.lastTime) : 0.0) * 0.001;
        this.lastTime = timeStamp;

        this.acc += deltaTime;

        while (this.acc > 1.0) {
            this.acc -= 1.0;
        }

        while (this.acc > (1.0 / LOGIC_FPS)) {
            this.update(1.0 / LOGIC_FPS);
            this.acc -= (1.0 / LOGIC_FPS);
        }
        //this.update(deltaTime);

        this.render();

        this.meter.tick();
        window.requestAnimationFrame(frame);
    },

    start: function() {
        this.canvas = document.getElementById('surface');
        renderer.initialize(this.canvas);

        //
        // this.context = this.canvas.getContext('2d');
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
            top:      '25px',      // Meter top offset.
            right:    'auto',     // Meter right offset.
            bottom:   'auto',     // Meter bottom offset.
            margin:   '0 0 0 0',  // Meter margin. Helps with centering the counter when left: 50%;

            // Theme
            theme: 'dark', // Meter theme. Build in: 'dark', 'light', 'transparent', 'colorful'.
            heat:  1,      // Allow themes to use coloring by FPS heat. 0 FPS = red, maxFps = green.

            // Graph
            graph:   1, // Whether to show history graph.
            history: 20 // How many history states to show in a graph.
        });

        window.addEventListener('resize', resize);
        this.canvas.addEventListener("mousedown", function(e) {
            particleSystem.mouseField.working = true;
            particleSystem.mouseField.x = e.clientX;
            particleSystem.mouseField.y = e.clientY;
        });
        this.canvas.addEventListener("mousemove", function(e) {
            particleSystem.mouseField.x = e.clientX;
            particleSystem.mouseField.y = e.clientY;
        });
        this.canvas.addEventListener("mouseup", function(e) {
            particleSystem.mouseField.working = false;
        });

        particleSystem.emitters.push(new Emitter(230.0, 100.0));
        particleSystem.addField(new Field(830.0, 200.0));
        particleSystem.addField(new Field(700.0, 330.0));
        particleSystem.addField(new Field(540.0, 510.0));
        particleSystem.mouseField.working = false;

        resize();

        window.requestAnimationFrame(frame);
    }
};

function resize() {
    game.canvas.width = window.innerWidth;
    game.canvas.height = window.innerHeight;
    renderer.resize(game.canvas.width, game.canvas.height);
    particleSystem.resize(game.canvas.width, game.canvas.height);
}

function frame(timeStamp) {
    game.loop(timeStamp);
}