import { Template, Component } from "pyrite";
import { CommentTemplate } from "./CommentTemplate";

import { dispatch } from "../../../flux";
import { POSTS_TYPES } from "../../../stores/posts";

interface CommentComponentProps {
	comment: any;
	post: any;
	key: number;
}

@Template(CommentTemplate)
export class CommentComponent extends Component<CommentComponentProps> {	
	post: any;
	comment: any;

	$onInit() {
		this.comment = this.props.comment;
		this.post = this.props.post;
	}

	delete() {
		dispatch({
			type: POSTS_TYPES.DELETE_COMMENT,
			postId: this.post.id,
			commentId: this.comment.id
		});
	} 
}
