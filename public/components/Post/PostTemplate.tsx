import { Render } from "pyrite";
import { PostComponent } from "./PostComponent";
import { CommentComponent } from "./Comment/CommentComponent";

export function PostTemplate (this: PostComponent) {
	return (
		<div id={"#post-" + this.post.id}>
			<div class="panel panel-primary">
				<div class="panel-heading">
					<span>Created by: <strong>{this.post.created_by}</strong></span>
					<span class="pull-right"><strong>{this.post.created_on}</strong></span>
				</div>
				<div class="panel-body">
					<p>{this.post.title}</p>
				</div>
				{this.post.comments.length ?
					<div class="panel-footer text-right">
						<span class="pull-left">Last comment from: <strong>{this.post.comments[this.post.comments.length - 1].created_by}</strong></span>
						<br class="visible-xs"/>
						<a href="javascript:" onclick={() => this.showComments = !this.showComments}>
							<span>{this.showComments ? "Hide comments" : "Show comments"}</span>
						</a> <span class="badge">{this.post.comments.length}</span>
					</div>
				: null }
			</div>
			<div class="row">
				<div class="col-md-10 col-md-offset-2">
					{this.showComments ? this.post.comments.map((comment: any, index: number) => (
						<CommentComponent key={index} comment={comment} />
					)): null}
					<div class="panel panel-default">
						<div class="panel-body">
							<div class="form-group">
				                <textarea rows="3" ref="comment" class="form-control" placeholder="New comment..." style="resize: none"/>
				            </div>
				          	<button type="button" class="btn btn-primary pull-right" onclick={this.create.bind(this)}>Add <i class="glyphicon glyphicon-comment"/></button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}