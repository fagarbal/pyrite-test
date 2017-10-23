import { Pyrite } from "pyrite";
import { PyriteConnect } from "pyrite-connect";
import { EmitterPlugin } from "pyrite-connect-emitter";

import { router } from "./router";

const connect = new PyriteConnect({
	url: "http://localhost:8000",
	plugins: [
		new EmitterPlugin()
	]
});

const pyrite = new Pyrite({
	inject: {
		connect: connect.getRoutes()
	},
	routes: router
});
