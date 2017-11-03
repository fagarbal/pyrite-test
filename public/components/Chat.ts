import { Component, Inject, Refs, core } from "pyrite";
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
		localStorage.setItem("pepe", "example");
		this.chats = await this.service.getChats();
		console.log(this.chats);
		core.redraw();
	}

	onSendChat() {
		this.service.on.sendChat((chat: any) => {
			this.addChat(chat);
		});
	}

	sendChat() {		
		this.service.sendChat(this.message);
	}

	addChat(chat: any) {
		this.chats.push(chat);
		this.message.msg = "";
	}

	$onUpdate() {
		this.refs.chatBox.scrollTop = this.refs.chatBox.scrollHeight
	}
}
