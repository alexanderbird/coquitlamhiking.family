import { h } from 'preact';

export const App = ({ children, title }) => (
  <html>
    <head>
      <meta charSet='UTF-8'/>
      <title>{ title }</title>
      <script src='./maps.js'></script>
      <link rel='stylesheet' href='./style.css'/>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
    </head>
    <body>
      { children }

      <script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&callback=initMap&libraries=&v=weekly`} async ></script>
    </body>
  </html>
);

