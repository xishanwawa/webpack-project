
var koa = require('koa');
var app = koa();

import React from 'react'
import { renderToString } from 'react-dom/server'

import { Router, RouterContext, match } from 'react-router';
import routes from '../app/routes';

import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';

function renderFullPage(html, initialState) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <script src="http://localhost:3000/vendor.c38e136f58129d54f187.js"></script>
    </head>
    <body>
      <div id="root">
          ${html}
      </div>
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
      </script>
      <script src="http://localhost:3000/main-min.js"></script>
    </body>
    </html>
  `;
}

app.use(function *(){

  this.body = renderFullPage("hello ytm", {ytm: "ytm"});
});

app.listen(3001);

// import express from 'express';
// import React from 'react';
// import { renderToString } from 'react-dom/server';
// import { RoutingContext, match } from 'react-router';
// import { Provider } from 'react-redux';
// import routes from '../app/routes/rootRoutes';
// import configureStore from '../app/store';

// const app = express();

// function renderFullPage(html, initialState) {
//   return `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//     </head>
//     <body>
//       <div id="root">
//         <div>
//           ${html}
//         </div>
//       </div>
//       <script>
//         window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
//       </script>
//       <script src="http://localhost:3000/main-min.js"></script>
//     </body>
//     </html>
//   `;
// }

// app.use((req, res) => {

//         const html = renderToString(
//           <Provider store={store}>
//             <RoutingContext {...renderProps} />
//           </Provider>
//         );
//         res.end(renderFullPage(html, {}));
// });

// var server = app.listen(3001, function () {

//   var host = server.address().address
//   var port = server.address().port

//   console.log("应用实例，访问地址为 http://%s:%s", host, port)

// })