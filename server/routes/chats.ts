import { Route, Get, Post, Body } from "pyrite-server";
import { Emits, Emit } from "pyrite-server-emitter";
import { Validation } from "pyrite-server-validations";

const validateMessage = {
	nick: {
		presence: true
	},
	msg: {
		presence: true
	}
};

@Route
export class Chats {
	chats: Array<any> = [];

	@Get
	getChats() {    
		return this.chats;
	}

	@Post
	@Emits
	@Validation(validateMessage) 
	sendChat(@Body chat: any, @Emit emit: any) {
		this.chats.push(chat);

		emit(chat);

		return chat;
	}
}