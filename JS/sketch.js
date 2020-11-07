var inc = 0.1;
var scl = 10;
var cols, rows;
var fr;
var zoff = 0;
var particles = [];
var flowField;

function setup() {
	createCanvas(400, 400);
	pixelDensity(1);
	cols = floor(width / scl);
	rows = floor(height / scl);
	fr = createP('');

	flowField = new Array(rows * cols);

	for (let i = 0; i < 300; i++) {
		particles[i] = new Particle();
	}
	background(255);
}

function draw() {
	var yoff = 0;
	for (let y = 0; y < rows; y++) {
		var xoff = 0;
		for (let x = 0; x < cols; x++) {
			var index = x + y * cols;
			var angle = noise(xoff, yoff, zoff)*TWO_PI*4;
			var v = p5.Vector.fromAngle(angle);
			v.setMag(1);
			flowField[index] = v;
			// stroke(0, 50);
			// push();
			// translate(x * scl, y * scl);
			// rotate(v.heading());
			// strokeWeight(1);
			// line(0, 0, scl, 0);
			// pop();

			xoff += inc;
		}
		yoff += inc;
		zoff += 0.0001;
	}

	for (let particle of particles) {
		particle.follow(flowField);
		particle.update();
		particle.show();
		particle.edges()
	}
	fr.html(floor(frameRate()));
}