import { Component, Template, m } from "pyrite";
import { LoginPageTemplate } from "./LoginPageTemplate";
import { services, AuthService } from "../../connect";

@Template(LoginPageTemplate)
export class LoginPageComponent extends Component<any>{
	authService: AuthService = services.Auth;

	errors: Array<string> = [];

	$onInit() {
		if (localStorage.getItem("token")) {
			this.preventDraw = true;

			return m.route.set("/main");
		}
	}

	async login() {
		this.errors = [];

		const username = document.getElementById("username") as HTMLInputElement;
		const password = document.getElementById("username") as HTMLInputElement;

		try {
			const loginResponse = await this.authService.login(username.value, password.value);

			localStorage.setItem("token", "Bearer " + loginResponse.token);
			m.route.set("/main");
		} catch (error) {
			this.errorLogin(error);
		}
	}

	errorLogin(loginError: any) {
		if (loginError.error && loginError.error.parameters) {
			const parameters = loginError.error.parameters;
			const errorNames = Object.keys(parameters);

			this.errors = errorNames.map((error) =>  parameters[error][0]);
		} else {
			this.errors = [loginError.message];
		}

		m.redraw();
	}

}