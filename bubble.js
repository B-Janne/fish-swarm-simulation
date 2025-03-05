class Bubble {
    constructor() {
        this.x = random(width); // Random x position
        this.y = random(height / 2, height); // Spawn below the surface
        this.r = random(4, 10); // Bubble size
        this.speed = random(1, 2); // Rising speed
        this.popped = false; // Track if the bubble has popped
    }

    move() {
        if (!this.popped) {
            this.y -= this.speed; // Rise vertically
            // Pop the bubble when it reaches the surface
            if (this.y < height / 4) { // Adjust this threshold as needed
                this.popped = true;
            }
        }
    }

    show() {
        if (!this.popped) {
            fill(255, 100); // Bubble color
            noStroke();
            ellipse(this.x, this.y, this.r); // Draw the bubble
        }
    }
}