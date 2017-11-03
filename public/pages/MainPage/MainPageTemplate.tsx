import { Render } from "pyrite";
import { MainPageComponent } from "./MainPageComponent";

export function MainPageTemplate (this: MainPageComponent) {
	return (
		<div>
			<div class="col-md-3 col-md-offset-1" style="position: fixed; left: 0;">
				<h3>New Post</h3>
				<div class="panel panel-default">
					<div class="panel-body">
						<div class="form-group">
							<span>Title</span>
							<input type="text" ref="title" class="form-control" placeholder="Post title..." />
						</div>
						<div class="form-group">
							<div class="row">
								<div class="col-md-6 col-md-offset-6">
									<button class="form-control btn btn-primary" onclick={this.createPost.bind(this)}>Create</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-5 col-md-offset-5" style="margin-top: 50px">
				{this.posts.map((post: any) => (
					<div key={post.id}>
						<div class="panel panel-primary">
							<div class="panel-heading">
								<span>Created by: <strong>{post.created_by}</strong></span>
								<span class="pull-right"><strong>{post.created_on}</strong></span>
							</div>
							<div class="panel-body">
								<p>{post.title}</p>
							</div>
							<div class="panel-footer text-right">
								{post.comments.length ?
									<span class="pull-left">Last comment from : <strong>{post.comments[post.comments.length - 1].created_by}</strong></span>
								: null }
								<a href="javascript:" onclick={() => this.showComments[post.id] = !this.showComments[post.id]}>
									<span>{this.showComments[post.id] ? "Hide comments" : "Show comments"}</span>
								</a> <span class="badge">{post.comments.length}</span>
							</div>
						</div>
						<div class="row">
							<div class="col-md-10 col-md-offset-2">
								{this.showComments[post.id] ? post.comments.map((comment: any) => (
									<div class="panel panel-warning">
										<div class="panel-heading">
											<span>Created by: <strong>{comment.created_by}</strong></span>
											<span class="pull-right"><strong>{comment.created_on}</strong></span>
										</div>
										<div class="panel-body">
											<p>{comment.message}</p>
										</div>
									</div>
								)): null}
								<div class="panel panel-default">
									<div class="panel-body">
										<div class="input-group">
							                <input type="text" class="form-control" placeholder="New comment..." oninput={(event: any) => this.comments[post.id] = event.target.value}/>
							                <span class="input-group-btn">
							                    <button type="button" class="btn btn-primary" onclick={this.createComment.bind(this, post.id, this.comments[post.id])}>Add</button>
							                </span>
							            </div>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}