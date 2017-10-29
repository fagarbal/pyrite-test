import { Component, Attributes, Children, Render } from "pyrite";

@Component(function(this: RootPage, x: any, v: any) {
	return (
		<div>
			<h1>Header</h1>
			{this.children}
		</div>
	);
})
export class RootPage {
	@Children children: Array<HTMLElement>;
}