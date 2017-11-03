import { Component, Attributes, Children } from "pyrite";
import { InputTemplate } from "./InputTemplate";

interface InputAttributes {
	title: string;
	field: string;
	onenter: Function;
	message: any;
}

@Component(InputTemplate)
export class Input {
	@Attributes attrs: InputAttributes;
	@Children children: Array<HTMLElement>;

	onEnter(event: any) {
		if (event.keyCode === 13) return this.attrs.onenter();
	} 
}