import { Component, Attributes, Children, Render, RouteParams, Refs, core } from "pyrite";

@Component(function(this: OtherPage, x: any, v: any) {
	return (
		<div>
			<h1>Other {this.params.id}</h1>
			<button onclick={this.click.bind(this)}>Chat</button>
			{this.children}
		</div>
	);
})
export class OtherPage {
	@Children children: Array<HTMLElement>;
	@RouteParams params: any;

	click() {
		core.route.set('/other/chat');
	}
}