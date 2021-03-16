import { h } from 'preact';

export const IndexApp = ({ hikes }) => (
  <html>
    <head>
      <title>Coquitlam Family Hikes</title>
    </head>
    <body>
      <h1>Coquitlam Family Hikes</h1>
      { hikes.map(hike => (
        <div>
          <h3><a href={`./${hike.slug}.html`}>{hike.name}</a></h3>
          <pre><code>
            { JSON.stringify(hike, null, 2) }
          </code></pre>
        </div>
      )) }
    </body>
  </html>
);
