import { Render } from "pyrite";
import { MainPageComponent } from "./MainPageComponent";
import { Post } from "../../components";

export function MainPageTemplate (this: MainPageComponent) {
	return (
		<div>
			<div class="col-md-3 col-md-offset-1" style="position: fixed; left: 0; top: 50px">
				<div class="panel panel-primary">
					<div class="panel-heading">
						<strong>New Post</strong>
					</div>
					<div class="panel-body">
						<div class="form-group">
							<textarea rows="3" ref="title" class="form-control" placeholder="Post title..." style="resize: none"/>
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
				<div class="form-group">
					<button class="btn btn-danger" onclick={this.logout.bind(this)}>Logout</button>
				</div>
			</div>
			<div class="col-md-5 col-md-offset-5" style="margin-top: 50px">
				{this.posts.map((post: any) => (
					<Post key={post.id} post={post} onCreateComment={this.createComment.bind(this)}/>
				))}
			</div>
		</div>
	);
}