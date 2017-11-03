import { Component, Attributes, Children, Render, core, RouteParams } from "pyrite";
import {Chat} from "./Chat";

@Component(function(this: ChatPage) {
	return (
		<div>
			<h1>Other {this.params.id}</h1>
			<button onclick={this.click2.bind(this)}>Adios</button>
			<button onclick={this.click3.bind(this)}>Hola</button>
		</div>
	);
})
export class ChatPage {
	@Children children: Array<HTMLElement>;
	@RouteParams params: any;

	click2() {
		core.route.set("/adios");
	}

	click3() {
		core.route.set("/hola");
	}

	$onInit(args?: any) {
		console.log("chat init");
	}

	$onCreate(args?: any) {
		console.log("chat create");
	}

	$onUpdate(args: any) {
		console.log("chat update");
	}

	$onRouteUpdate(args: any, oldArgs: any) {
		console.log("chat before update route");
	}

	$onBeforeUpdate(args: any, oldArgs: any) {
		console.log("chat before update");
	}

	$onBeforeRemove(args: any) {
		console.log("chat before remove");
	}

	$onRemove() {
		console.log("chat remove");
	}
}