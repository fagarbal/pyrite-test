import { Store } from "../flux";

const POSTS_TYPES = {
	CREATE_POST: "CREATE_POST",
	CREATE_COMMENT: "CREATE_COMMENT",
	CREATE_POSTS: "CREATE_POSTS"
};

const PostsStore = new Store({
	posts: []
});

PostsStore.on(POSTS_TYPES.CREATE_POSTS, function (this: any, action: any, oldState: any) {
	return {
		posts: action.posts
	};
});

PostsStore.on(POSTS_TYPES.CREATE_POST, (action: any, oldState: any) => {
	oldState.posts.unshift(action.post);

	return {
		posts: oldState.posts // If the oldState did not change you can ommit the return.
	};
});

PostsStore.on(POSTS_TYPES.CREATE_COMMENT, (action: any, oldState: any) => {
	const currentPost = oldState.posts.find((post: any) => post.id == action.comment.id);

	currentPost.comments.push(action.comment.comment);

	// See. Here there is no return becose the actual and oldState are the same.
});

export { PostsStore, POSTS_TYPES };

