let school = [];
let bubbles = [];
let breads = [];
let ripples = [];
let attractionRadius = 200;

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    for (let i = 0; i < 40; i++) {
        school.push(new Fish(random(width), random(height)));
    }
    for (let i = 0; i < 5; i++) {
        bubbles.push(new Bubble());
    }
}

function draw() {
    drawBackground();

    // Draw and update bread pieces
    for (let i = breads.length - 1; i >= 0; i--) {
        breads[i].show();
        if (breads[i].isEaten()) {
            breads.splice(i, 1);
        }
    }

    // Update and show fish
    for (let fish of school) {
        fish.moveTowardBread();
        fish.flock(school);
        fish.update();
        fish.edges();
        fish.show();
    }

    // Update and show bubbles
    for (let i = bubbles.length - 1; i >= 0; i--) {
        bubbles[i].move();
        bubbles[i].show();
        if (bubbles[i].popped) {
            ripples.push(new Ripple(bubbles[i].x, bubbles[i].y));
            bubbles.splice(i, 1);
        }
    }

    // Update and show ripples
    for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].update();
        ripples[i].show();
        if (ripples[i].isFinished()) {
            ripples.splice(i, 1);
        }
    }

    // Add new bubbles occasionally
    if (random() < 0.01) {
        bubbles.push(new Bubble());
    }
}

function mousePressed() {
    breads.push(new Bread(mouseX, mouseY));
    ripples.push(new Ripple(mouseX, mouseY));
}

function drawBackground() {
    background(10, 80, 100);
    noStroke();
    for (let y = 0; y < height; y += 20) {
        for (let x = 0; x < width; x += 20) {
            let noiseVal = noise(x * 0.01, y * 0.01, frameCount * 0.02);
            let rippleColor = color(
                10 + noiseVal * 50,
                80 + noiseVal * 30,
                100 + noiseVal * 20
            );
            fill(rippleColor);
            rect(x, y, 20, 20);
        }
    }
}