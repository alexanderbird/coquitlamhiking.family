export function parseImage(image) {
  try {
    const [_, name, _width, _height] = image.match(/(map|[0-9]+)@(\d+)x(\d+)/)
    const width = Number(_width);
    const height = Number(_height);
    return { name, height, width, isMap: name === 'map' };
  } catch(e) {
    e.message = `Failed to parse image '${image}'. ${e.message}`;
    throw e;
  }
}
