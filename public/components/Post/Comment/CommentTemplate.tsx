import { m } from "pyrite";
import { CommentComponent } from "./CommentComponent";

export function CommentTemplate (this: CommentComponent) {
	return (
		<div class="panel panel-warning">
			<div class="panel-heading">
				<span>Created by: <strong>{this.comment.created_by}</strong></span>
				<span class="pull-right"><strong>{this.comment.created_on}</strong></span>
			</div>
			<div class="panel-body">
				<p>{this.comment.message}</p>
				<button class="btn btn-danger pull-right" onclick={this.delete.bind(this)}>
					Delete <i class="glyphicon glyphicon-trash"></i>
				</button>
			</div>
		</div>
	);
}