import { Component, Refs, Inject, core } from "pyrite";
import { RegisterPageTemplate } from "./RegisterPageTemplate";

import { AuthService } from "../../connect";

interface RegisterPageRefs {
	username: HTMLInputElement;
	password: HTMLInputElement;
	repeat_password: HTMLInputElement;
}

@Component(RegisterPageTemplate)
export class RegisterPageComponent {

	@Refs refs: RegisterPageRefs;

	@Inject("connect.Auth") authService: AuthService;

	errors: Array<string> = [];
	success: boolean = false;

	register() {
		this.errors = [];

		const username = this.refs.username.value;
		const password = this.refs.password.value;
		const repeat_password = this.refs.repeat_password.value;

		if (password !== repeat_password) {
			return this.errors = ["The passwords are not the same"];
		}

		this.authService.register(username, password)
		.then((registerResponse: any) => {
			this.success = true;

			setTimeout(() => core.route.set("/login"), 2000);

			core.redraw();
		})
		.catch(this.errorLogin.bind(this));
	}

	errorLogin(registerError: any) {
		if (registerError.error && registerError.error.parameters) {
			const parameters = registerError.error.parameters;
			const errorNames = Object.keys(parameters);

			this.errors = errorNames.map((error) =>  parameters[error][0]);
		} else {
			this.errors = [registerError.message];
		}

		core.redraw();
	}

	goBack() {
		core.route.set("/login");
	}
}