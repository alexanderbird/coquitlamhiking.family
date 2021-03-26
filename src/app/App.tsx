import { h } from 'preact';

export const App = ({ children, title, className, MetaTagsComponent }) => (
  <html>
    <head>
      <meta charSet='UTF-8'/>
      <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🥾</text></svg>"/>
      <title>{ title }</title>
      <script src='./registerServiceWorker.js'></script>
      <script src='./maps.js'></script>
      <script src='./mapStyle.js'></script>
      <script src='./detectViewportHeight.js'></script>
      <link rel='stylesheet' href='./style.css'/>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <MetaTagsComponent />
    </head>
    <body className={className}>
      { children }

      <script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&callback=initMap&libraries=&v=weekly`} async ></script>
    </body>
  </html>
);

