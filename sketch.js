let frame = 0;

// noise
let octaves = 64;
let falloff = 0.5;
let noiseScale = 0.0075;
let seed = 45;

// color palette
let palette = [
  "#FFFFFF",
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
  "#000000",
];

// theming
let currentTheme = "light";
let themeBackground = 255;
let themeStroke = 0;

function setup() {
  createCanvas(504, 813).parent("container");
  pixelDensity(1);
  frameRate(1);
  noStroke();
  noiseSeed(seed);
  noiseDetail(octaves, falloff);
}

function draw() {
  background(themeBackground);
  if (frame < 60) {
    loadPixels();
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        set(x, y, pickColor(x, y));
      }
    }
    updatePixels();
    saveCanvas("sequence_" + frame, "png");
    frame++;
    console.log(frame);
  } else {
    noLoop();
  }
}

function pickColor(x, y) {
  let noiseValue = noise(x * noiseScale + frameCount / 50, y * noiseScale);
  if (noiseValue < 0.57) {
    c = palette[11];
  } else if (noiseValue < 0.6) {
    if (random() > pow(noiseValue - 0.57, 2) * 100) {
      c = palette[11];
    } else {
      c = palette[10];
    }
  } else if (noiseValue < 0.63) {
    c = palette[9];
  } else if (noiseValue < 0.66) {
    c = palette[8];
  } else if (noiseValue < 0.69) {
    c = palette[7];
  } else if (noiseValue < 0.72) {
    c = palette[6];
  } else if (noiseValue < 0.75) {
    c = palette[5];
  } else if (noiseValue < 0.78) {
    c = palette[4];
  } else if (noiseValue < 0.81) {
    c = palette[3];
  } else if (noiseValue < 0.84) {
    c = palette[2];
  } else if (noiseValue < 0.87) {
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
function toggleP5Theme() {
  if (currentTheme === "dark") {
    themeBackground = 255;
    themeStroke = 0;
    currentTheme = "light";
  } else if (currentTheme === "light") {
    themeBackground = 0;
    themeStroke = 255;
    currentTheme = "dark";
  }
}

// toggle the movement
// function startStop() {
//   if (isLooping()) {
//     noLoop();
//   } else {
//     loop();
//   }
// }

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
