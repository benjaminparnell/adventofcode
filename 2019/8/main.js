const fs = require("fs");

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

const input = fs
  .readFileSync(__dirname + "/input.txt", "utf8")
  .split("")
  .map(Number);

const image = parseToImage(input, 25, 6);
const layer = getLayerWithFewestZeros(image);

// Task one
console.log(countPixelInLayer(layer, 1) * countPixelInLayer(layer, 2));
