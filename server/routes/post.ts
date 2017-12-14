import { Route, Get, Post, Body, Query, Storage, Params, Exception, Before, Request, Delete} from "pyrite-server";
import { Emits, Emit, Broadcast } from "pyrite-server-emitter";
import { Validation } from "pyrite-server-validations";
import { posts, users } from "../mocks/mocks";
import { checkUser } from "../utils/jwt";

@Route
@Before(checkUser(users))
@Storage("Authorization", "token")
export class Posts {
	ids: number = 1;

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
		post.created_on = (new Date()).toLocaleString();

		const index = posts.unshift(post);

		emit(post);

		return post;
	}

	@Delete("/:id", Number)
	@Emits
	deletePost(@Params("id") id: number, @Emit emit: Function) {
		const postIndex: any = posts.findIndex((post: any) => post.id == id);
		
		if (postIndex < 0) throw Exception(400, "Post id invalid");

		posts.splice(postIndex, 1);

		const response = {
			postId: id
		}

		emit(response);

		return response;
	}

	@Post("/:id", Number)
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
		comment.created_on = (new Date()).toLocaleString();

		const index = post.comments.push(comment);
		post.comments[index - 1].id = index;

		emit({ id, comment });

		return {
			success: index
		};
	}

	@Delete("/:postId/:commentId", Number, Number)
	@Emits
	deleteComment(@Params("postId") postId: number, @Params("commentId") commentId: number,@Emit emit: Function) {
		const post: any = posts.find((post: any) => post.id == postId);
		
		if (!post) throw Exception(400, "Post id invalid");
		
		const commentIndex: any = post.comments.find((comment: any) => comment.id == commentId);
		
		if (commentIndex < 0) throw Exception(400, "Comment id invalid");

		post.comments.splice(commentIndex, 1);

		const response = {
			postId, commentId
		}

		emit(response);

		return response;
	}

}