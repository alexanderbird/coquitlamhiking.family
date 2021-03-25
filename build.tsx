import * as fs from 'fs';
import * as path from 'path';
import { h } from 'preact';
import * as dotenv from 'dotenv'; dotenv.config();
import { exec } from 'child_process';

import { MainPage } from './src/app/MainPage';
import { HikePage } from './src/app/HikePage';
import { loadData } from './src/loadData';
import * as mapCenter from './src/coquitlam.json';

import { render } from 'preact-render-to-string';

const hikes = loadData('./hikes.yaml');
if (!hikes) {
  process.exit(1);
}

fs.writeFileSync('./build/index.html', render(<MainPage hikes={hikes} mapCenter={mapCenter} />));

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


exec('sass src/css/*.scss build/style.css', (error, stdout, stderr) => {
  if(error) console.error(error);
  if(stderr) console.error(stderr);
  if(stdout) console.log(stdout);
});
