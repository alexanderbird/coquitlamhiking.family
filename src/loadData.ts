import * as fs from 'fs';
import * as yaml from 'js-yaml';

export function loadData(path) {
  try {
    const fileContents = fs.readFileSync(path, 'utf8');
    return yaml.load(fileContents);
  } catch (e) {
    console.error(e);
    return false;
  }
}
