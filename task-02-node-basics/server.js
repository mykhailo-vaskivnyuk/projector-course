const http = require("http");
const Router = require("./router");
const { HtmlResponseError } = require("./error");
const { routeHello } = require("./routes/hello");
const { routeGoodbye } = require("./routes/goodbye");
const { host, port, baseUrl } = require("./config");

const router = new Router(baseUrl);
router.addRoute("/hello", routeHello);
router.addRoute("/goodbye", routeGoodbye);

const server = http.createServer((req, res) => {
    try {
        router.callRoute(req, res);
    } catch (e) {
        if (!(e instanceof HtmlResponseError)) throw e;
        res.statusCode = e.statusCode;
        res.setHeader("Content-Type", "text/plain");
        res.end(e.message);
    }
})

server.listen(port, host, () =>
    console.log(`Server is running on ${baseUrl}`)
);
