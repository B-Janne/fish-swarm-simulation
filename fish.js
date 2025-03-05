class Fish {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.velocity = p5.Vector.random2D().mult(random(2, 3));
        this.acceleration = createVector(0, 0);
        this.maxForce = 0.05;
        this.maxSpeed = 3;
        this.size = 12;
        this.color = color(random(100, 180), random(180, 255), random(200, 255));
        this.target = null;
        this.eatingTime = 0;
    }

    moveTowardBread() {
        if (breads.length > 0) {
            let closestBread = null;
            let minDist = Infinity;

            for (let bread of breads) {
                let d = dist(this.position.x, this.position.y, bread.position.x, bread.position.y);
                if (d < minDist) {
                    minDist = d;
                    closestBread = bread;
                }
            }

            if (closestBread && minDist < attractionRadius) {
                this.target = closestBread.position;
            } else {
                this.target = null;
            }
        } else {
            this.target = null;
        }

        if (this.target) {
            let attractionForce = p5.Vector.sub(this.target, this.position);
            let d = attractionForce.mag();
            if (d > 2) {
                attractionForce.setMag(this.maxSpeed * 2);
                attractionForce.sub(this.velocity);
                attractionForce.limit(this.maxForce * 3);
                this.acceleration.add(attractionForce);
            }
        }
    }

    flock(fishes) {
        if (this.target) return;

        let alignment = this.align(fishes);
        let cohesion = this.cohere(fishes);
        let separation = this.separate(fishes);

        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
    }

    align(fishes) {
        let perceptionRadius = 60;
        let steering = createVector();
        let total = 0;
        for (let other of fishes) {
            let d = this.position.dist(other.position);
            if (other !== this && d < perceptionRadius) {
                steering.add(other.velocity);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    cohere(fishes) {
        let perceptionRadius = 60;
        let steering = createVector();
        let total = 0;
        for (let other of fishes) {
            let d = this.position.dist(other.position);
            if (other !== this && d < perceptionRadius) {
                steering.add(other.position);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.sub(this.position);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    separate(fishes) {
        let perceptionRadius = 35;
        let steering = createVector();
        let total = 0;
        for (let other of fishes) {
            let d = this.position.dist(other.position);
            if (other !== this && d < perceptionRadius) {
                let diff = p5.Vector.sub(this.position, other.position);
                diff.div(d);
                steering.add(diff);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    edges() {
        if (this.position.x > width) this.position.x = 0;
        if (this.position.x < 0) this.position.x = width;
        if (this.position.y > height) this.position.y = 0;
        if (this.position.y < 0) this.position.y = height;
    }

    show() {
        push();
        translate(this.position.x, this.position.y);
        rotate(this.velocity.heading());
        fill(this.color);
        noStroke();
        beginShape();
        vertex(-this.size, -this.size / 3);
        vertex(this.size, 0);
        vertex(-this.size, this.size / 3);
        endShape(CLOSE);
        pop();
    }
}