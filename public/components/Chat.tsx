import { Component, Render, Inject, core } from "pyrite";
import { Input } from "./Input";

const chatStyles = {
	overflowY: "auto",
	height: "450px"
};

const marginTop = {
	marginTop: "10px"
};

@Component(function (this: Chat) {
	const chats = this.chats.map((chat: any, key: string) => {;
		const isCurrentUser = this.message.nick === chat.nick;
		const alert = isCurrentUser ? "alert-warning offset-2" : " alert-info";

		return (
			<div key={key} class={"col-10 alert " + alert}>
				<strong>{chat.nick}</strong>
				<div>{chat.msg}</div>
			</div>
		);
	});

	return (
		<div class="container-fluid" style={marginTop}>
			<div class="row justify-content-center">
				<div class="col-10 border border-secondary" style={chatStyles} ref="chatBox">{chats}</div>
			</div>
			<div class="row justify-content-center" style={marginTop}>
				<Input message={this.message} field="nick" title="Nick" onenter={this.sendChat.bind(this)} />
				<Input message={this.message} field="msg" title="Msg" onenter={this.sendChat.bind(this)} />
			</div>
			<div class="row justify-content-center">
				<button class="btn btn-outline-danger" onclick={this.sendChat.bind(this)}>Send</button>
			</div>
		</div>
	);
})
export class Chat {
	chats: any = [];
	message: any = {};
	refs: any;

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

	sendChat(event: any): void {		
		const body = {
			msg: this.message.msg,
			nick: this.message.nick
		};

		this.service.sendChat({ body });
	}

	addChat(chat: any): void {
		this.chats.push(chat);
		this.message.msg = "";
		core.redraw();

		this.refs.chatBox.scrollTop = this.refs.chatBox.scrollHeight;
	}
}
