import { router, m } from "pyrite";
import { PyriteConnect } from "pyrite-connect";
import { EmitterPlugin } from "pyrite-connect-emitter";

import { configRoutes } from "./router";

import { services } from "./connect";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const connect = new PyriteConnect({
	url: "http://localhost:8000",
	plugins: [
		new EmitterPlugin()
	]
});

connect.getRoutes()
.then((routes) => {
	Object.assign(services, routes);

	m.route(document.body, "/login", router.build(configRoutes));
});
