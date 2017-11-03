import { Component, Attributes, Children, Render, RouteParams, Refs, core } from "pyrite";

@Component(function(this: OtherPage, x: any, v: any) {
	return (
		<div>
			<h1>Other {this.params.id}</h1>
			<button onclick={this.click2.bind(this)}>Adios</button>
			<button onclick={this.click3.bind(this)}>Hola</button>
		</div>
	);
})
export class OtherPage {
	@RouteParams params: any;

	click2() {
		core.route.set("/adios");
	}

	click3() {
		core.route.set("/hola");
	}

	$onInit(args?: any) {
		console.log("other init");
	}

	$onCreate(args?: any) {
		console.log("other create");
	}

	$onUpdate(args: any) {
		console.log("other update");
	}

	$onRouteUpdate(args: any, oldArgs: any) {
		console.log("other before update route");
	}

	$onBeforeUpdate(args: any, oldArgs: any) {
		console.log("other before update");
	}

	$onBeforeRemove(args: any) {
		console.log("other before remove");
	}

	$onRemove() {
		console.log("other remove");
	}
}