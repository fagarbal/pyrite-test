import { Route, Get, Post, Body, Query, Storage, Params, Exception } from "pyrite-server";
import { Emits, Emit } from "pyrite-server-emitter";
import { Validation } from "pyrite-server-validations";
import { createToken } from "../utils/jwt";
import { users } from "../mocks/mocks";

const validateAuth = {
	username: {
		presence: true
	},
	password: {
		presence: true
	}
};

@Route
export class Auth {

	@Post
	@Validation(validateAuth)
	login(@Body("username") username: string, @Body("password") password: string) {
		const validUser = users.find((user) => user.username === username && user.password === password);

		if (!validUser) throw Exception(401, "Invalid username or password");

		return {
			token: createToken(validUser)
		};
	}

	@Post
	@Validation(validateAuth)
	register(@Body("username") username: string, @Body("password") password: string) {
		const userExists = users.find((user) => user.username === username);

		if (userExists) throw Exception(400, "Username already exists");

		const index = users.push({
			username, password
		});

		return {
			success: index
		};
	}

}