import { Render } from "pyrite";
import { RegisterPageComponent } from "./RegisterPageComponent";

export function RegisterPageTemplate (this: RegisterPageComponent) {
	const registerForm = (
		<div>
			<div class="form-group">
				<span>User</span>
				<input type="text" ref="username" class="form-control" placeholder="Username..." disabled={this.success}/>
			</div>
			<div class="form-group">
				<span>Password</span>
				<input type="password" ref="password" class="form-control" placeholder="Password..." disabled={this.success}/>
			</div>
			<div class="form-group">
				<span>Repeat password</span>
				<input type="password" ref="repeat_password" class="form-control" placeholder="Repeat password..." disabled={this.success}/>
			</div>
			{this.errors.map((error) => ( 
				<div class="alert alert-danger">
					<p class="text-center">{error}</p>
				</div>
			))}
			{this.success ? ( 
				<div class="alert alert-success">
					<p class="text-center">User created</p>
				</div>
			): null }
			<div class="form-group">
				<div class="row">
					<div class="col-sm-6">
						<button class="form-control btn btn-primary" onclick={this.goBack.bind(this)} disabled={this.success}>Go Back</button>
					</div>
					<div class="visible-xs form-group"></div>
					<div class="col-sm-6">
						<button class="form-control btn btn-success" onclick={this.register.bind(this)} disabled={this.success}>Register</button>
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
						<span><strong>Register</strong></span>
					</div>
					<div class="panel-body">
						<div class="row">
							<div class="col-lg-12">
								{registerForm}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}