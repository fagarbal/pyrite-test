export type Post = {
	id?: number;
	title: string;
	created_on?: Date;
	created_by?: string;
	comments?: Array<Comment>;
};

export type Comment = {
	text: string;
	created_on?: Date;
	created_by?: string;
};

export type CreateSuccess = {
	success: number;
};

export type CommentEmitted = {
	id: number;
	comment: Comment;
}

export interface PostsService {
	getPosts(): Promise<Post>;
	createPost(post: Post): Promise<CreateSuccess>;
	createComment(postId: number, comment: Comment): Promise<CreateSuccess>;

	on: {
		createPost(callback: (post: Post, emitterId?: number, options?: any) => void): void;
		createComment(callback: (comment: CommentEmitted, emitterId?: number, options?: any) => void): void;
	}

	off: {
		createPost(): void;
		createComment(): void;
	}
};
