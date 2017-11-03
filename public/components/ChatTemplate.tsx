import { Render } from "pyrite";
import { Input } from "./Input";
import { Chat } from "./Chat";
const chatStyles = {
	overflowY: "auto",
	height: "450px"
};

const marginTop = {
	marginTop: "10px"
};

export function ChatTemplate(this: Chat) {
	const chats = this.chats.map((chat: any, key: string) => {;
		const isCurrentUser = this.message.nick === chat.nick;
		const alert = isCurrentUser ? "alert-warning offset-2" : " alert-info";

		return (
			<div key={key} class={"col-10 alert " + alert}>
				<strong class="fabio">{chat.nick}</strong>
				<div>{chat.msg}</div>
			</div>
		);
	});

	return (
		<div class="chat-component container-fluid" style={marginTop}>
			<div class="row justify-content-center">
				<div class="col-10 border border-secondary" style={chatStyles} ref="chatBox">{chats}</div>
			</div>
			<div class="row justify-content-center" style={marginTop}>
				<Input message={this.message} field="nick" title="Nick" onenter={this.sendChat.bind(this)}>
					<span class="input-group-addon">Nick</span>
				</Input>
				<Input message={this.message} field="msg" title="Msg" onenter={this.sendChat.bind(this)}>
					<span class="input-group-addon">Msg</span>
				</Input>
			</div>
			<div class="row justify-content-center">
				<button class="btn btn-outline-danger" onclick={this.sendChat.bind(this)}>Send</button>
			</div>
		</div>
	);
}