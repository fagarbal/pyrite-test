import { Component, Refs, Attributes } from "pyrite";
import { PostTemplate } from "./PostTemplate";

@Component(PostTemplate)
export class PostComponent {
	@Refs refs: any;
	@Attributes attrs: any;

	post: any;
	showComments: boolean;

	$onInit() {
		this.post = this.attrs.post;
	}

	create() {
		const comment = this.refs.comment.value;

		this.attrs.onCreateComment(this.post.id, comment)
		.then(() => {
			this.refs.comment.value = "";
		});
	}
}