import * as fs from 'fs';
import * as path from 'path';
import { h } from 'preact';
import * as dotenv from 'dotenv'; dotenv.config();

import { MainPage } from './src/MainPage';
import { HikePage } from './src/HikePage';
import { loadData } from './src/loadData';

import { render } from 'preact-render-to-string';

const hikes = loadData('./hikes.yaml');
if (!hikes) {
  process.exit(1);
}

fs.writeFileSync('./build/index.html', render(<MainPage hikes={hikes} />));

hikes.forEach(hike => {
  const html = render(<HikePage hike={hike} />);
  fs.writeFileSync(`./build/${hike.slug}.html`, html);
});

fs.readdirSync('./src/static')
  .filter(file => !file.match(/^\./))
  .forEach(file => {
    const source = path.join('./src/static', file);
    const destination = path.join('./build',file);
    fs.createReadStream(source).pipe(fs.createWriteStream(destination));
  });



