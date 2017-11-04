import { Component, Refs, Inject, core } from "pyrite";
import { MainPageTemplate } from "./MainPageTemplate";

import { PostsService } from "../../connect";

interface MainPageRefs {
	title: HTMLInputElement;
}

@Component(MainPageTemplate)
export class MainPageComponent {

	@Refs refs: MainPageRefs;
	@Inject("connect.Posts") postsService: PostsService;

	posts: Array<any> = [];
	comments: any = {};
	showComments: any = {};

	$onCreate() {
		this.postsService.getPosts()
		.then((posts: any) => {
			this.posts = posts;
		});

		this.postsService.on.createPost((post: any) => {
			this.posts.push(post);
		});

		this.postsService.on.createComment((commentResponse: any) => {
			const currentPost = this.posts.find((post) => post.id == commentResponse.id);
			currentPost.comments.push(commentResponse.comment);
		});
	}

	$onRemove() {
		this.postsService.off.createPost();
		this.postsService.off.createComment();
	}

	createPost() {
		const title = this.refs.title.value;

		this.postsService.createPost({ title })
		.then(() => {
			this.refs.title.value = "";
		});
	}

	createComment(id: number, message: string) {
		return this.postsService.createComment(id, { message });
	}

	logout() {
		localStorage.removeItem("token");
		core.route.set("/login");
	}

}