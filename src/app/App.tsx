import { h } from 'preact';

import { MetaTags } from './MetaTags';

const icon = (image, size) => 
  `https://images.hiker.family/${image}.jpg?nf_resize=smartcrop&w=${size}&h=${size}`;

export const App = ({ children, title, className, metaTags }) => (
  <html>
    <head>
      <meta charSet='UTF-8'/>
      <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🥾</text></svg>"/>
      <title>{ title }</title>
      <script src='/main.js'></script>
      <link rel='stylesheet' href='/style.css'/>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='manifest' href='/manifest.json' />
      <link rel='apple-touch-icon' href='' />
      <link rel="apple-touch-icon" href={icon('pinecone-burke/005', 48)}/>
      <link rel="apple-touch-icon" sizes="152x152" href={icon('pinecone-burke/005', 152)}/>
      <link rel="apple-touch-icon" sizes="180x180" href={icon('pinecone-burke/005', 180)}/>
      <link rel="apple-touch-icon" sizes="167x167" href={icon('pinecone-burke/005', 167)}/>
      <MetaTags {...metaTags} />
    </head>
    <body className={className}>
      { children }

      <script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&callback=initMap&libraries=&v=weekly`} async ></script>
    </body>
  </html>
);

