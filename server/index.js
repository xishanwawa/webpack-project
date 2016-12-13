
var koa = require('koa');
var app = koa();

function renderFullPage(html, initialState) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
    </head>
    <body>
      <div id="root">
        <div>
          ${html}
        </div>
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