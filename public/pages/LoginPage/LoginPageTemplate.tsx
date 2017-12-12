import { m } from "pyrite";
import { LoginPageComponent } from "./LoginPageComponent";

export function LoginPageTemplate (this: LoginPageComponent) {
	const loginForm = (
		<div>
			<div class="form-group">
				<span>User</span>
				<input type="text" id="username" class="form-control" placeholder="Username..." />
			</div>
			<div class="form-group">
				<span>Password</span>
				<input type="password" id="password" class="form-control" placeholder="Password..." />
			</div>
			{this.errors.map((error) => ( 
				<div class="alert alert-danger">
					<p class="text-center">{error}</p>
				</div>
			))}
			<div class="form-group">
				<div class="row">
					<div class="col-sm-6 col-sm-offset-3">
						<button class="form-control btn btn-primary" onclick={this.login.bind(this)}>Log In</button>
					</div>
				</div>
			</div>
			<div class="form-group">
				<div class="row">
					<div class="col-lg-12">
						<div class="text-center">
							<a href="#!/register">Not registered?</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<div class="col-xs-12" style={{ marginTop: "20px" }}>
			<div class="col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
				<div class="panel panel-primary">
					<div class="panel-heading text-center">
						<span>
							<strong>Login</strong>
						</span>
					</div>
					<div class="panel-body">
						<div class="row">
							<div class="col-lg-12">
								{loginForm}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

