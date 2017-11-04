import { Component, Attributes } from "pyrite";
import { CommentTemplate } from "./CommentTemplate";

@Component(CommentTemplate)
export class CommentComponent {
	@Attributes attrs: any;
	
	comment: any;

	$onInit() {
		this.comment = this.attrs.comment;
	}
}
