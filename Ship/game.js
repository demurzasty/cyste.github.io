var canvas  = null;
var context = null;
var lastTimestamp = null;

var images = [];

var contentProgress = 0;
var contentMax      = 0;

var target = { 
	x: 0, 
	y: 0 
};

var particles = [];

function inRange(a, min, max) {
	return (a >= min && a <= max);
}

var player = {
	x: 20,
	y: 20,
	speed: 200,
	rotation: 0,
	jetTime: 0.0,

	update: function(deltaTime) {
		this.jetTime -= deltaTime;

		var direction = {
			x: target.x - this.x,
			y: target.y - this.y
		};
		var targetRotation = Math.atan2(direction.y, direction.x);

		while (this.rotation > Math.PI * 2.0) {
			this.rotation -= Math.PI * 2.0;
		}

		while (this.rotation < 0.0) {
			this.rotation += Math.PI * 2.0;
		}

		while (targetRotation > Math.PI * 2.0) {
			targetRotation -= Math.PI * 2.0;
		}

		while (targetRotation < 0.0) {
			targetRotation += Math.PI * 2.0;
		}


		if (targetRotation > this.rotation ) {
			// if (inRange(this.rotation, Math.PI * 1.5, Math.PI * 2.0) && inRange(targetRotation, 0.0, Math.PI * 0.5))
			//this.rotation += deltaTime * Math.PI;
			if (targetRotation - this.rotation > Math.PI) {
				this.rotation -= deltaTime * Math.PI;
			} else {
				this.rotation += deltaTime * Math.PI;
			}
		} else {
			if (this.rotation - targetRotation > Math.PI) {
				this.rotation += deltaTime * Math.PI;
			} else {
				this.rotation -= deltaTime * Math.PI;
			}
		}

		var length = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
		if (length >= 0.0) {
			direction.x /= length;
			direction.y /= length;

			this.x += Math.cos(this.rotation) * this.speed * deltaTime;
			this.y += Math.sin(this.rotation) * this.speed * deltaTime;
			//this.x += direction.x * this.speed * deltaTime;
			//this.y += direction.y * this.speed * deltaTime;

			if (this.jetTime <= 0.0) {
				particles.push({
					x: this.x,
					y: this.y,
					alpha: 1.0
				});
				// console.log(particles.length);
				this.jetTime = 0.00;
			}
		}
	},

	render: function() {
		context.save();

		context.translate(this.x, this.y);
		context.rotate(this.rotation);

		context.drawImage(images.ship, 0, 0, 20, 20, -10, -10, 20, 20);

		context.restore();
	}
};

function resize() {
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
}

function mousemove(x, y) {
	target.x = x;
	target.y = y;
}

function isLoaded() {
	return (contentProgress == contentMax);
}

function loadImage(name, path) {
	contentMax++;
	var image = images[name] = new Image();
	image.onload = function() { contentProgress++; };
	image.src = path;
}

function load() {
	loadImage('ship', 'assets/ship.png');
	loadImage('jet', 'assets/jet.png');

	target.x = canvas.width * 0.5;
	target.y = canvas.height * 0.5;

	player.x = canvas.width * 0.5;
	player.y = canvas.height * 0.5;
}

function update(deltaTime) {
	for (var i = 0; i < particles.length; i++) {
		particles[i].alpha -= deltaTime * 3.0;

		if (particles[i].alpha <= 0.0) {
			particles.splice(i--, 1);
		}
	}

	player.update(deltaTime);
}


function render() {
	context.fillStyle = 'black';
	context.fillRect(0.0, 0.0, canvas.width, canvas.height);

	if (particles.length > 0) {
		context.strokeStyle = 'red';
		// context.moveTo(particles[0].x, particles[0].y);
		for (var i = 1; i < particles.length; i++) {
			
			context.globalAlpha = particles[i].alpha;
			context.beginPath();
			context.moveTo(particles[i - 1].x, particles[i - 1].y);
			// var size = context.globalAlpha * 4;
			//context.drawImage(images.jet, 7, 7, 6, 6, particles[i].x - size / 2, particles[i].y - size / 2, size, size);
			//context.beginPath();
			//context.arc(particles[i].x, particles[i].y, 2.0 * particles[i].alpha, 0, 2 * Math.PI, false);
			//context.fillStyle = 'red';
			//context.fill();
			context.lineWidth = particles[i].alpha * 3.0;
			context.lineTo(particles[i].x, particles[i].y);
			context.stroke();
		}
		
		context.beginPath();
		context.moveTo(particles[particles.length - 1].x, particles[particles.length - 1].y);
		context.lineTo(player.x, player.y);
		context.stroke();
	}


	context.globalAlpha = 1.0;

	player.render();
}

function loop(timestamp) {
	if (!lastTimestamp) {
		lastTimestamp = timestamp;
	}

	if (isLoaded()) {
		var deltaTime = (timestamp - lastTimestamp) * 0.001;
		while (deltaTime > 1.0 / 120.0) {
			update(1.0 / 120.0);
			deltaTime -= 1.0 / 120.0;
		}

		update(deltaTime);

		render();
	}

	lastTimestamp = timestamp;
	window.requestAnimationFrame(loop);
}

function start() {
	canvas = document.getElementById('surface');
	context = canvas.getContext('2d');

	window.onresize    = resize;
	window.addEventListener('mousemove', function(event) {
		mousemove(event.clientX, event.clientY);
	});

	resize();

	load();

	window.requestAnimationFrame(loop);
}