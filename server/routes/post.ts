import { Route, Get, Post, Body, Query, Storage, Params, Exception, Before, Request} from "pyrite-server";
import { Emits, Emit } from "pyrite-server-emitter";
import { Validation } from "pyrite-server-validations";
import { posts } from "../mocks/mocks";
import { checkUser } from "../utils/jwt";

@Route
@Before(checkUser)
@Storage("Authorization", "token")
export class Posts {
	ids: number = 2;

	@Get
	getPosts() {
		return posts;
	}

	@Post
	@Emits
	@Validation({
		title: {
			presence: true
		}
	})
	createPost(@Body post: any, @Emit emit: Function, @Request("user") loggedUser: string) {
		post.id = this.ids++;
		post.comments = [];
		post.created_by = loggedUser;
		post.created_on = (new Date()).toDateString();

		const index = posts.push(post);

		emit(post);

		return {
			success: post.id
		};
	}

	@Post("/:id")
	@Emits
	@Validation({
		message: {
			presence: true
		}
	})
	createComment(@Params("id") id: number, @Body comment: any, @Emit emit: Function, @Request("user") loggedUser: string) {
		const post: any = posts.find((post: any) => post.id == id);

		if (!post) throw Exception(400, "Post id invalid");

		comment.created_by = loggedUser;
		comment.created_on = (new Date()).toDateString();

		const index = post.comments.push(comment);

		emit({ id, comment });

		return {
			success: index
		};
	}

}