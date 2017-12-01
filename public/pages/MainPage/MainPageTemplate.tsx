import { m } from "pyrite";
import { MainPageComponent } from "./MainPageComponent";
import { Post } from "../../components";

export function MainPageTemplate (this: MainPageComponent) {
	return (
		<div>
			<div class="col-md-3 col-md-offset-1">
				<div class="form-group" style="margin-top: 20px;">
					<button class="btn btn-danger" onclick={this.logout.bind(this)}>Logout <i class="glyphicon glyphicon-log-out"/></button>
				</div>
				<div class="panel panel-default" style="margin-top: 20px;">
					<div class="panel-heading">
						<strong>New Post</strong>
					</div>
					<div class="panel-body">
						<div class="form-group">
							<textarea rows="3" id="title" class="form-control" placeholder="Post title..." style="resize: none"/>
						</div>
						<div class="form-group">
							<div class="row">
								<div class="col-md-6 col-md-offset-6">
									<button class="form-control btn btn-primary" onclick={this.createPost.bind(this)}>Create <i class="glyphicon glyphicon-send" /></button>
								</div>
							</div>
						</div>
					</div>
				</div>
				{this.posts.length ?
					<div class="panel panel-default" style="margin-top: 20px;">
						<div class="panel-heading">
							<strong>Post List</strong>
						</div>
						<div class="panel-body">
							{this.posts.map((post: any) => (
								<div class="form-group">
									<a href="javascript:" onclick={this.goTo.bind(this, post.id)}>
										{post.title}
									</a> {post.comments.length ? <span class="badge">{post.comments.length}</span> : null}
								</div>
							))}
						</div>
					</div> : null
				}
			</div>
			<div class="col-md-6 col-md-offset-1" style="margin-top: 75px;">
				{this.posts.map((post: any) => (
					<Post key={post.id} post={post} onCreateComment={this.createComment.bind(this)}/>
				))}
			</div>
		</div>
	);
}