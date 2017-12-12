import { Component, Template, m } from "pyrite";
import { RegisterPageTemplate } from "./RegisterPageTemplate";

import { services, AuthService } from "../../connect";

@Template(RegisterPageTemplate)
export class RegisterPageComponent extends Component<any> {
	authService: AuthService = services.Auth;

	errors: Array<string> = [];
	success: boolean = false;

	$onInit() {
		if (localStorage.getItem("token")) {
			this.preventDraw = true;

			return m.route.set("/main");
		}
	}

	register() {
		this.errors = [];

		const username = document.getElementById("username") as HTMLInputElement;
		const password = document.getElementById("password") as HTMLInputElement;
		const repeat_password = document.getElementById("repeat_password") as HTMLInputElement;

		if (password.value !== repeat_password.value) {
			return this.errors = ["The passwords are not the same"];
		}

		this.authService.register(username.value, password.value)
		.then((registerResponse: any) => {
			this.success = true;

			setTimeout(() => m.route.set("/login"), 1000);

			m.redraw();
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

		m.redraw();
	}

	goBack() {
		m.route.set("/login");
	}
}