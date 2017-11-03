import * as jwt from "jwt-simple";
import * as moment from "moment";

export function createToken(user: any) {
	const payload = {
		username: user.username,
		iat: moment().unix(),
		exp: moment().add(1, 'days').unix(),
	};

	return jwt.encode(payload, 'EXAMPLE');
}

export function checkUser (req: any, res: any, next?: Function) {
	if (!req.headers.authorization) {
		return res
		.status(403)
		.send({
			error: "Invalid Token"
		});
	}

	const token = req.headers.authorization.split(" ")[1];
	let payload;

	try {
		payload = jwt.decode(token, "EXAMPLE");
	} catch (error) {
		return res
		.status(401)
		.send({
			error: "Invalid Token"
		});
	}

	if (payload.exp <= moment().unix()) {
		return res
		.status(401)
		.send({
			error: "Expired Token"
		});
	}

	req.user = payload.username;

	if (next) next();
};