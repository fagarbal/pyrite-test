import { Component, Refs, Inject, core } from "pyrite";
import { LoginPageTemplate } from "./LoginPageTemplate";

import { AuthService } from "../../connect";

interface LoginPageRefs {
	username: HTMLInputElement;
	password: HTMLInputElement;
}

@Component(LoginPageTemplate)
export class LoginPageComponent {

	@Refs refs: LoginPageRefs;
	@Inject("connect.Auth") authService: AuthService;

	errors: Array<string> = [];

	login() {
		this.errors = [];

		const username = this.refs.username.value;
		const password = this.refs.password.value;

		this.authService.login(username, password)
		.then((loginResponse: any) => {
			localStorage.setItem("token", loginResponse.token);
			core.route.set("/main");
		})
		.catch(this.errorLogin.bind(this));
	}

	errorLogin(loginError: any) {
		if (loginError.error && loginError.error.parameters) {
			const parameters = loginError.error.parameters;
			const errorNames = Object.keys(parameters);

			this.errors = errorNames.map((error) =>  parameters[error][0]);
		} else {
			this.errors = [loginError.message];
		}

		core.redraw();
	}

}