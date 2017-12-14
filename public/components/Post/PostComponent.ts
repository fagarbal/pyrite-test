import { Component, Template } from "pyrite";
import { PostTemplate } from "./PostTemplate";

import { dispatch } from "../../flux";
import { POSTS_TYPES } from "../../stores/posts";

interface PostComponentProps {
	post: any;
	onCreateComment: Function;
	onDeletePost: Function;
	onDeleteComment: Function;
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

	delete() {
		this.props.onDeletePost(this.post.id)
		.then(() => {
			dispatch({
				type: POSTS_TYPES.DELETE_POST,
				postId: this.post.id
			});
		});
	} 
}