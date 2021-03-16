import * as fs from 'fs';
import * as path from 'path';
import { h } from 'preact';
import * as dotenv from 'dotenv'; dotenv.config();

import { IndexApp } from './src/index.app';
import { HikeApp } from './src/hike.app';
import { loadData } from './src/loadData';

import { render } from 'preact-render-to-string';

const hikes = loadData('./hikes.yaml');
if (!hikes) {
  process.exit(1);
}

fs.writeFileSync('./build/index.html', render(<IndexApp hikes={hikes} />));

hikes.forEach(hike => {
  const html = render(<HikeApp hike={hike} />);
  fs.writeFileSync(`./build/${hike.slug}.html`, html);
});

fs.readdirSync('./src/static')
  .filter(file => !file.match(/^\./))
  .forEach(file => {
    const source = path.join('./src/static', file);
    const destination = path.join('./build',file);
    fs.createReadStream(source).pipe(fs.createWriteStream(destination));
  });



