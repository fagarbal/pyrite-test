import { Component, Attributes, Children, Render } from "pyrite";
import {Chat} from "./Chat";

@Component(function(this: ChatPage) {
	return (
		<div>
			<h1>Chat</h1>
			<Chat></Chat>
		</div>
	);
})
export class ChatPage {
	@Children children: Array<HTMLElement>;
}