import { PyriteServer } from "pyrite-server";
import { EmitterPlugin } from "pyrite-server-emitter";
import { ValidationPlugin } from "pyrite-server-validations";

const server = new PyriteServer({
  port: 8000,
  routes: "/routes",
  cors: ["http://localhost:8080","http://4cd8dc37.ngrok.io"],
  plugins: [new EmitterPlugin(), new ValidationPlugin()]
});

server.listen(() => {
  console.log("Server running!");
});