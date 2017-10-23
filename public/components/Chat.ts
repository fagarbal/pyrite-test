import { Component, Inject, Refs } from "pyrite";
import { ChatTemplate } from "./ChatTemplate";
import { Input } from "./Input";

interface ChatReferences {
	chatBox: HTMLDivElement;
}

@Component(ChatTemplate)
export class Chat {
	chats: any = [];
	message: any = {};
	
	@Refs refs: ChatReferences;

	@Inject("connect.Chats") service: any;

	constructor() {
		this.getChats();
		this.onSendChat();
	}

	async getChats() {
		this.chats = await this.service.getChats();
	}

	onSendChat() {
		this.service.on.sendChat((chat: any) => {
			this.addChat(chat);
		});
	}

	sendChat() {		
		this.service.sendChat({
			body: {
				msg: this.message.msg,
				nick: this.message.nick
			}
		});
	}

	addChat(chat: any) {
		this.chats.push(chat);
		this.message.msg = "";
	}

	onupdate() {
		this.refs.chatBox.scrollTop = this.refs.chatBox.scrollHeight
	}
}
