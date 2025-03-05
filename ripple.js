class Ripple {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 5; // Initial ripple radius
        this.maxRadius = 30; // Maximum ripple radius
        this.opacity = 255; // Initial opacity
    }

    update() {
        this.r += 1; // Expand the ripple
        this.opacity -= 5; // Fade out the ripple
    }

    show() {
        noFill();
        stroke(255, this.opacity);
        strokeWeight(2);
        ellipse(this.x, this.y, this.r * 2);
    }

    isFinished() {
        return this.opacity <= 0;
    }
}