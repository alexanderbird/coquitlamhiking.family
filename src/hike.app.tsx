import { h, FunctionComponent } from 'preact';

export const HikeApp: FunctionComponent<{ hike: any }> = ({ hike }) => (
  <html>
    <head>
      <title>{hike.name} | Coquitlam Family Hikes</title>
    </head>
    <body>
      <h1>{hike.name}</h1>
      <pre><code>
        { JSON.stringify(hike, null, 2) }
      </code></pre>
    </body>
  </html>
);
