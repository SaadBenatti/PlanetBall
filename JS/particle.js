class Particle {
	constructor() {
		this.pos = createVector(random(width), random(height));
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);
		this.maxSpeed = 4;
		// this.h = 0;
		// this.speed = 1;

		this.prevPos = this.pos.copy();
	}

	update() {
		this.vel.add(this.acc);
		this.vel.limit(this.maxSpeed);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}

	follow(vectors) {
		let x = floor(this.pos.x / scl);
		let y = floor(this.pos.y / scl);
		let index = x + y * cols;
		let force = vectors[index];
		this.applyForce(force);
	}

	applyForce(force) {
		this.acc.add(force);
	}

	show() {
		stroke(0, 25);
		// stroke(this.h, 25);
		// if(this.h > 255) {
		// 	this.speed  = -1;
		// }
		// else if (this.h < 0) {
		// 	this.speed = 1;
		// }

		// this.h += this.speed;

		strokeWeight(1);
		line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    	this.updatePrev();
	}

	updatePrev() {
		this.prevPos.x = this.pos.x;
		this.prevPos.y = this.pos.y;
	}

	edges() {
		if (this.pos.x > width) {
			this.pos.x = 0;
			this.updatePrev();
		}
		if (this.pos.x < 0) {
			this.pos.x = width;
			this.updatePrev();
		}
		if (this.pos.y > height) {
			this.pos.y = 0;
			this.updatePrev();
		}
		if (this.pos.y < 0) {
			this.pos.y = height;
			this.updatePrev();
		}
	}
}