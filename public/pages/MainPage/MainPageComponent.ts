import { Component, Template, m } from "pyrite";
import { MainPageTemplate } from "./MainPageTemplate";

import { services, PostsService } from "../../connect";

@Template(MainPageTemplate)
export class MainPageComponent extends Component<any> {

	postsService: PostsService = services.Posts;

	posts: Array<any> = [];
	comments: any = {};
	showComments: any = {};

	$onInit() {
		if (!localStorage.getItem("token")) return m.route.set("/login");
		
		this.postsService.getPosts()
		.then((posts: any) => {
			this.posts = posts;
			
			this.postsService.on.createPost((post: any) => {
				this.posts.unshift(post);
			});

			this.postsService.on.createComment((commentResponse: any) => {
				const currentPost = this.posts.find((post) => post.id == commentResponse.id);
				currentPost.comments.push(commentResponse.comment);
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
		const post = document.getElementById("#post-" + id);
		if (post) window.scrollTo(0, post.offsetTop);
	}

	logout() {
		localStorage.removeItem("token");
		m.route.set("/login");
	}

}