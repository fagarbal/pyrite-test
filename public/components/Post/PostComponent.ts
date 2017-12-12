import { Component, Template } from "pyrite";
import { PostTemplate } from "./PostTemplate";

interface PostComponentProps {
	key: number;
	post: any;
	onCreateComment: Function;
}

@Template(PostTemplate)
export class PostComponent extends Component<PostComponentProps>{
	post: any;
	showComments: boolean;

	$onInit() {
		this.post = this.props.post;
	}

	create() {
		const comment = document.getElementById("comment" + this.post.id) as HTMLInputElement;

		this.props.onCreateComment(this.post.id, comment.value)
		.then(() => {
			comment.value = "";
		});
	}
}