// recording
const totalFrames = 10;
let counter = 0;
let record = false;

// noise
let seed = 45;
let octaves = 64;
let falloff = 0.5;
let noiseScale = 0.0075;

// thresholds

function setup() {
  createCanvas(504, 813).parent("container");
  pixelDensity(1);
  frameRate(1);
  noStroke();
  noiseSeed(seed);
  noiseDetail(octaves, falloff);
}

function draw() {
  let percent = float(counter % totalFrames) / totalFrames;
  render(percent);
  counter++;
}

function render(percent) {
  background(0);
  let a = percent * TWO_PI;
  console.log(a);

  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let index = (x + y * width) * 4;
      new NoiseLoop(0.5, 0, width);
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
      } else if (noiseValue < 0.8) {
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
}

class NoiseLoop {
  constructor(diameter, min, max) {
    this.diameter = diameter;
    this.min = min;
    this.max = max;
  }

  value(a) {
    let xoff = map(cos(a), -1, 1, 0, this.diameter);
    let yoff = map(sin(a), -1, 1, 0, this.diameter);
    let r = noise(xoff, yoff);
    return map(r, 0, 1, this.min, this.max);
  }
}
