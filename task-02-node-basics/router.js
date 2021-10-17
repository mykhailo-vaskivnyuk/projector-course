const { HttpResponseError } = require("./error");

class Router {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.routes = [];
    }

    addRoute(pathname, callback) {
        this.routes.push({ pathname, callback });
    }

    callRoute(req, res) {
        const { url: path } = req;
        const url = new URL(path, this.baseUrl);
        const { pathname, searchParams } = url;

        const route = this.routes.find((route) => route.pathname === pathname);
        if (!route) throw new HttpResponseError(404);

        const query = [...searchParams.entries()]
            .reduce((r, [name, value]) =>
                Object.assign(r, { [name]: value }),
                {},
            );

        route.callback(req, res, query);
    }
}

module.exports = Router;
