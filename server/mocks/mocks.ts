export const users = [{
	username: "test",
	password: "test"
}];

export const posts = [{
	id: 1,
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
}]