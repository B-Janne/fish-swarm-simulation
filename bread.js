class Bread {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.lifespan = 300;
        this.opacity = 255;  // Opacity for fading effect
    }

    show() {
        if (this.lifespan > 0) {
            push();
            translate(this.position.x, this.position.y);
            fill(230, 180, 120, this.opacity); 
            stroke(200, 150, 100, this.opacity);
            strokeWeight(2);
            beginShape();
            vertex(-8, 3);
            vertex(-4, -5);
            vertex(5, -7);
            vertex(9, -3);
            vertex(6, 4);
            vertex(-2, 7);
            endShape(CLOSE);
            pop();
            
            this.lifespan--;
            this.opacity = map(this.lifespan, 0, 300, 0, 255);
        }
    }

    isEaten() {
        return this.lifespan <= 0;
    }
}