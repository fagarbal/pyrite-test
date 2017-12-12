import { Component, Template, m } from "pyrite";
import { MainPageTemplate } from "./MainPageTemplate";

import { services, PostsService } from "../../connect";

import { dispatch } from "../../flux";
import { POSTS_TYPES } from "../../stores/posts";

@Template(MainPageTemplate)
export class MainPageComponent extends Component<any> {

	postsService: PostsService = services.Posts;

	comments: any = {};
	showComments: any = {};

	$onInit() {
		if (!localStorage.getItem("token")) {
			this.preventDraw = true;
			return m.route.set("/login");
		}
		
		this.postsService.getPosts()
		.then((posts: any) => {
			dispatch({
				type: POSTS_TYPES.CREATE_POSTS,
				posts: posts
			});
			
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
		})
		.catch(() => {
			localStorage.removeItem("token");
			m.route.set("/login");
		});
	}

	$onRemove() {
		this.postsService.off.createPost();
		this.postsService.off.createComment();
	}

	createPost() {
		const title = document.getElementById("title") as HTMLInputElement;

		this.postsService.createPost({ title: title.value })
		.then(() => {
			title.value = "";
		});
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