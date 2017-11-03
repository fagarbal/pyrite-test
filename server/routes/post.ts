import { Route, Get, Post, Body, Query, Storage, Params, Exception, Before, Request} from "pyrite-server";
import { Emits, Emit } from "pyrite-server-emitter";
import { Validation } from "pyrite-server-validations";
import { checkUser } from "../utils/jwt";

const validatePost = {
	title: {
		presence: true
	}
};

const validateComment = {
	message: {
		presence: true
	}
};

let ids = 0;

const posts = [{
	id: ++ids,
	title: "Title post",
	created_by: "test",
	created_on: (new Date()).toDateString(),
	comments: [{
		message: "Comment message",
		created_by: "test",
		created_on: (new Date()).toDateString()
	}, {
		message: "Comment message",
		created_by: "test",
		created_on: (new Date()).toDateString()
	}]
}];

@Route
@Before(checkUser)
@Storage("Authorization", "token")
export class Posts {

	@Get
	getPosts() {
		return posts;
	}

	@Post
	@Emits
	@Validation(validatePost)
	createPost(@Body post: any, @Emit emit: Function, @Request("user") loggedUser: string) {
		post.id = ++ids;
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
	@Validation(validateComment)
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