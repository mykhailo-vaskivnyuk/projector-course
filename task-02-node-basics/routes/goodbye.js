const { HttpResponseError } = require("../error");

const routeGoodbye = (req, res, query) => {
    const { method } = req;
    const { name } = query;

    if (method !== "GET") throw new HttpResponseError(404);

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    if (name) res.end(`Goodbye, ${name}`);
    else res.end("Goodbye");
}

module.exports = { routeGoodbye };
