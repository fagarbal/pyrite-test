export type Post = {
	id?: number;
	title: string;
	created_on?: Date;
	created_by?: string;
	comments?: Array<Comment>;
};

export type Comment = {
	message: string;
	created_on?: Date;
	created_by?: string;
};

export type DeletePost = {
	postId: number;
};

export type DeleteComment = {
	postId: number;
	commentId: number;
};

export type Success = {
	success: number;
};

export type CommentEmitted = {
	id: number;
	comment: Comment;
}

export interface PostsService {
	getPosts(): Promise<Post>;
	createPost(post: Post): Promise<Success>;
	deletePost(postId: number): Promise<Success>;
	createComment(postId: number, comment: Comment): Promise<Success>;
	deleteComment(postId: number, commentId: number): Promise<Success>;

	on: {
		createPost(callback: (post: Post, emitterId?: number, options?: any) => void): void;
		createComment(callback: (comment: CommentEmitted, emitterId?: number, options?: any) => void): void;
		deletePost(callback: (comment: DeletePost, emitterId?: number, options?: any) => void): void;
		deleteComment(callback: (comment: DeleteComment, emitterId?: number, options?: any) => void): void;
	}

	off: {
		createPost(): void;
		createComment(): void;
		deletePost(): void;
		deleteComment(): void;
	}
};
