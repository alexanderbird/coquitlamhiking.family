export function parseImage(image) {
  const [_, name, _width, _height] = image.match(/([0-9]+)@(\d+)x(\d+)/)
  const width = Number(_width);
  const height = Number(_height);
  return { name, height, width };
}
