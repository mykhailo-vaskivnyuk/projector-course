const HtmlResponceError = require("../error");

const routeGoodbye = (req, res, query) => {
    const { method } = req;
    const { name, ...restParams } = query;

    if (method !== "GET") throw new HtmlResponceError(405);

    
    const otherParams = Object.keys(restParams);
    if (otherParams.length)
        throw new HtmlResponceError(400, `Such params: ${otherParams} aren't allowed!`);

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    if (name) res.end(`Goodbye, ${name}`);
    else res.end("Goodbye");
}

module.exports = routeGoodbye;
