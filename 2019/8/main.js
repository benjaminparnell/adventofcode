const fs = require("fs");

const PixelColours = {
  BLACK: 0,
  WHITE: 1,
  TRANSPARENT: 2
};

function parseToImage(array, width, height) {
  const image = [];
  const layerSize = width * height;

  for (let index = 0; index < array.length - 1; index += layerSize) {
    const layer = [];
    for (
      let rowIndex = index;
      rowIndex < index + layerSize;
      rowIndex += width
    ) {
      layer.push(array.slice(rowIndex, rowIndex + width));
    }
    image.push(layer);
  }

  return image;
}

function countPixelInLayer(layer, digit) {
  return layer.reduce(
    (count, row) => row.filter(pixel => pixel === digit).length + count,
    0
  );
}

function getLayerWithFewestZeros(image) {
  return image.reduce((memo, layer) => {
    if (!memo || countPixelInLayer(memo, 0) > countPixelInLayer(layer, 0)) {
      memo = layer;
    }
    return memo;
  });
}

function getPixelAtCoordinate(image, x, y) {
  return image.filter(layer => layer[y][x] !== PixelColours.TRANSPARENT)[0][y][
    x
  ];
}

function getFinalLayer(image) {
  const width = image[0][0].length;
  const height = image[0].length;
  const finalImage = image[0].slice();

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      finalImage[y][x] = getPixelAtCoordinate(image, x, y);
    }
  }

  return finalImage;
}

function printLayer(layer) {
  const width = layer[0].length;
  const height = layer.length;

  for (let y = 0; y < height; y++) {
    let row = "";
    for (let x = 0; x < width; x++) {
      row += ` ${layer[y][x]}`;
    }
    console.log(row);
  }
}

const input = fs
  .readFileSync(__dirname + "/input.txt", "utf8")
  .split("")
  .map(Number);

const image = parseToImage(input, 25, 6);
const layer = getLayerWithFewestZeros(image);

// Task one
console.log(countPixelInLayer(layer, 1) * countPixelInLayer(layer, 2));

// Task two
printLayer(getFinalLayer(image));
