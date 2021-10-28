const http = require("http");
const Router = require("./router");
const { HttpResponseError } = require("./error");
const { routeUpload } = require("./routes/upload");
const { host, port, baseUrl } = require("./config");

process.chdir(__dirname);
console.log(process.cwd());

const router = new Router(baseUrl);
router.addRoute("/upload", routeUpload);

const server = http.createServer((req, res) => {
    try {
        router.callRoute(req, res);
    } catch (e) {
        if (!(e instanceof HttpResponseError)) throw e;
        res.statusCode = e.statusCode;
        res.setHeader("Content-Type", "text/plain");
        res.end(e.message);
    }
})

server.listen(port, host, () =>
    console.log(`Server is running on ${baseUrl}`)
);
