const http = require("http");
const { host, port, baseUrl } = require("./config");
const Router = require("./router");
const hello = require("./routes/hello");
const goodbye = require("./routes/goodbye");
const HtmlResponceError = require("./error");

const router = new Router(baseUrl);
router.addRoute("/hello", hello);
router.addRoute("/goodbye", goodbye);

const server = http.createServer((req, res) => {
    try {
        router.callRoute(req, res);
    } catch (e) {
        if (!(e instanceof HtmlResponceError)) throw e;
        res.statusCode = e.statusCode;
        res.setHeader("Content-Type", "text/plain");
        res.end(e.message);
    }
})

server.listen(port, host, () =>
    console.log(`Server is running on ${baseUrl}`)
);
