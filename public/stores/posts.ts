import { Store } from "../flux";

export const POSTS_TYPES = {
	CREATE_POST: "CREATE_POST",
	CREATE_COMMENT: "CREATE_COMMENT",
	CREATE_POSTS: "CREATE_POSTS",
	DELETE_COMMENT: "DELETE_COMMENT",
	DELETE_POST: "DELETE_POST"
};

class PostsStore extends Store {
	[POSTS_TYPES.CREATE_POSTS](action: any) {
		return {
			posts: action.posts
		};
	}

	[POSTS_TYPES.CREATE_POST](action: any, oldState: any) {
		oldState.posts.unshift(action.post);

		return {
			posts: oldState.posts
		}
	}

	[POSTS_TYPES.CREATE_COMMENT](action: any, oldState: any) {
		const currentPost = oldState.posts.find((post: any) => post.id == action.comment.id);

		currentPost.comments.push(action.comment.comment);

		return {
			posts: oldState.posts
		};
	}

	[POSTS_TYPES.DELETE_POST](action: any, oldState: any) {
		const currentPost = oldState.posts.findIndex((post: any) => post.id == action.postId);

		oldState.posts.splice(currentPost, 1);

		return {
			posts: oldState.posts
		};
	}

	[POSTS_TYPES.DELETE_COMMENT](action: any, oldState: any) {
		const currentPost = oldState.posts.find((post: any) => post.id == action.postId);
		const currentComment = currentPost.comments.findIndex((comment: any) => comment.id == action.commentId);

		currentPost.comments.splice(currentComment, 1);

		return {
			posts: oldState.posts
		};
	}
}

export const postsStore = new PostsStore({
	posts: []
}, POSTS_TYPES);