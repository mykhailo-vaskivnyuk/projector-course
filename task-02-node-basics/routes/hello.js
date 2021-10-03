const { HtmlResponseError } = require("../error");

const routeHello = (req, res, query) => {
    const { method } = req;
    const { name } = query;

    if (method !== "GET") throw new HtmlResponseError(404);

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    if (name) res.end(`Hello, ${name}`);
    else res.end("Hello, world");
}

module.exports = { routeHello };
