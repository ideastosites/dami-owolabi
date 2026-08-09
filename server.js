// Passenger entry point for cPanel's Node.js Selector — wraps `next start`
// so Phusion Passenger can hand it a port via process.env.PORT. See
// DEPLOYMENT.md section 4 for how this gets wired up in cPanel.
const { createServer } = require("http");
const next = require("next");

const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(process.env.PORT || 3000);
});
