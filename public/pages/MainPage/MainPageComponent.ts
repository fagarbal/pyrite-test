import { Component, Template, m } from "pyrite";
import { MainPageTemplate } from "./MainPageTemplate";

import { services, PostsService } from "../../connect";

import { dispatch, state } from "../../flux";
import { POSTS_TYPES, postsStore } from "../../stores/posts";

@Template(MainPageTemplate)
export class MainPageComponent extends Component<any> {

	postsService: PostsService = services.Posts;

	comments: any = {};
	showComments: any = {};

	@state(postsStore, "posts") posts: any;

	$onInit() {
		this.getPosts();
		this.createEvents();
	}

	$onRemove() {
		this.postsService.off.createPost();
		this.postsService.off.createComment();
	}

	async getPosts() {
		try {
			const posts = await this.postsService.getPosts()

			dispatch({
				type: POSTS_TYPES.CREATE_POSTS,
				posts: posts
			});
			
			
		} catch(e) {
			localStorage.removeItem("token");
			m.route.set("/login");
		};
	}

	createEvents() {
		this.postsService.on.createPost((post: any) => {
			dispatch({
				type: POSTS_TYPES.CREATE_POST,
				post: post
			});
		});

		this.postsService.on.createComment((commentResponse: any) => {
			dispatch({
				type: POSTS_TYPES.CREATE_COMMENT,
				comment: commentResponse
			});
		});
	}

	async createPost() {
		const title = document.getElementById("title") as HTMLInputElement;

		await this.postsService.createPost({ title: title.value });
		title.value = "";
	}

	createComment(id: number, message: string) {
		return this.postsService.createComment(id, { message });
	}

	goTo(id: number) {
		const post = document.getElementById("post-" + id);
		if (post) window.scrollTo(0, post.offsetTop);
	}

	logout() {
		localStorage.removeItem("token");
		m.route.set("/login");
	}

}