// scaling
scale = 1;

// noise
let octaves = 64;
let falloff = 0.5;
let noiseScale = 0.0075 * 4;

// color palettes
let palette = [
  "#FAFAFA",
  "#F5F5F5",
  "#EEEEEE",
  "#E0E0E0",
  "#BDBDBD",
  "#9E9E9E",
  "#757575",
  "#616161",
  "#424242",
  "#212121",
];

// theming
let currentTheme = "light";
let themeBackground = 255;
let themeStroke = 0;

function setup() {
  createCanvas(126 * 1, 203 * 1).parent("container");
  pixelDensity(1);
  frameRate(30);
  noStroke();
  noiseDetail(octaves, falloff);
  paletteSelector = 17;
  background(0);
}

function draw() {
  loadPixels();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * 4;
      let noiseValue = noise(x * noiseScale + frameCount / 10, y * noiseScale);
      if (noiseValue < 0.56) {
        pixels[index] = 0;
        pixels[index + 1] = 0;
        pixels[index + 2] = 0;
      } else {
        pixels[index] = 255;
        pixels[index + 1] = 255;
        pixels[index + 2] = 100;
      }
    }
  }
  updatePixels();
}

function pickColor(x, y) {
  // noiseScale = 0.0025 * sin(frameCount / 100) + 0.0075;
  let noiseValue = noise(x * noiseScale, y * noiseScale);
  if (noiseValue < 0.56) {
    c = palette[9];
  } else if (noiseValue < 0.6) {
    c = palette[8];
  } else if (noiseValue < 0.64) {
    c = palette[7];
  } else if (noiseValue < 0.68) {
    c = palette[6];
  } else if (noiseValue < 0.72) {
    c = palette[5];
  } else if (noiseValue < 0.76) {
    c = palette[4];
  } else if (noiseValue < 0.8) {
    c = palette[3];
  } else if (noiseValue < 0.84) {
    c = palette[2];
  } else if (noiseValue < 0.88) {
    c = palette[1];
  } else {
    c = palette[0];
  }
  return color(c);
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

// toggle between themes (light/dark)
// function toggleP5Theme() {
//   if (currentTheme === "dark") {
//     themeBackground = 255;
//     themeStroke = 0;
//     currentTheme = "light";
//   } else if (currentTheme === "light") {
//     themeBackground = 0;
//     themeStroke = 255;
//     currentTheme = "dark";
//   }
// }

// toggle the movement
function startStop() {
  if (isLooping()) {
    noLoop();
  } else {
    loop();
  }
}

// save a screenshot
function saveScreenshot() {
  let date = new Date();
  let currentDate =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getDate() +
    "-" +
    date.getHours() +
    "-" +
    date.getMinutes() +
    "-" +
    date.getSeconds();
  saveCanvas("texture_" + currentDate, "png");
}
