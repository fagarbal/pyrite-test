import { Template, Component } from "pyrite";
import { CommentTemplate } from "./CommentTemplate";

interface CommentComponentProps {
	comment: any;
	key: number;
}

@Template(CommentTemplate)
export class CommentComponent extends Component<CommentComponentProps> {	
	comment: any;

	$onInit() {
		this.comment = this.props.comment;
	}
}
