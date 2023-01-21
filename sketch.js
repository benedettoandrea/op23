// recording
const totalFrames = 300;
let frameCounter = 0;
let recording = false;

// noise
let seed = 45;
let octaves = 64;
let falloff = 0.5;
let noiseScale = 0.0075;
let diameter = 100;

function setup() {
  createCanvas(504, 813).parent("container");
  pixelDensity(1);
  frameRate(1);
  background(0);
  noStroke();
  noiseSeed(seed);
  noiseDetail(octaves, falloff);
}

function draw() {
  if (recording === true) {
    let percentage = float(frameCounter % totalFrames) / totalFrames;
    render(percentage);
    frameCounter++;
  }
}

function render(percent) {
  let a = percent * TWO_PI;
  if (frameCounter < totalFrames) {
    let xoff = map(cos(a), -1, 1, 0, diameter);
    let yoff = map(sin(a), -1, 1, 0, diameter);
    loadPixels();
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let index = (x + y * width) * 4;
        let noiseValue = noise(
          (xoff + x) * noiseScale,
          (yoff + y) * noiseScale
        );
        if (noiseValue < 0.57) {
          pixels[index + 0] = 0;
          pixels[index + 1] = 0;
          pixels[index + 2] = 0;
        } else if (noiseValue < 0.63) {
          pixels[index + 0] = 41;
          pixels[index + 1] = 41;
          pixels[index + 2] = 41;
        } else if (noiseValue < 0.69) {
          pixels[index + 0] = 78;
          pixels[index + 1] = 78;
          pixels[index + 2] = 78;
        } else if (noiseValue < 0.75) {
          pixels[index + 0] = 119;
          pixels[index + 1] = 119;
          pixels[index + 2] = 119;
        } else if (noiseValue < 0.81) {
          pixels[index + 0] = 162;
          pixels[index + 1] = 162;
          pixels[index + 2] = 162;
        } else if (noiseValue < 0.87) {
          pixels[index + 0] = 208;
          pixels[index + 1] = 208;
          pixels[index + 2] = 208;
        } else {
          pixels[index + 0] = 255;
          pixels[index + 1] = 255;
          pixels[index + 2] = 255;
        }
      }
    }
    updatePixels();
    saveCanvas("sequence_" + frameCounter, "png");
  } else {
    noLoop();
  }
}

// start recording
function startPauseRecording() {
  if (recording === false) {
    recording = true;
  } else {
    recording = false;
  }
}
