import { Component, Attributes, Render, Refs, core, Inject, RouteParams, Children } from "pyrite";
import { Modal } from "./Modal";

@Component(function(this: RootPage) {
	return (
		<div>
		<h1>Header</h1>
		{this.children}
		</div>
	);
})
export class RootPage {
	chats: any;
	@Children children: any;
	@Inject("connect.Chats") service: any;

	onSuccess() {
		alert("success");
	}

	onSuccessOther() {
		alert("success other");
	}

	$onInit(args?: any) {
		console.log("root init");
	}

	$onCreate(args?: any) {
		console.log("root create");
	}

	$onUpdate(args: any) {
		console.log("root update");
	}

	$onRouteUpdate(args: any, oldArgs: any) {
		console.log("root before update route");
	}

	$onBeforeUpdate(args: any, oldArgs: any) {
		console.log("root before update");
	}

	$onBeforeRemove(args: any) {
		console.log("root before remove");
	}

	$onRemove() {
		console.log("root remove");
	}
}