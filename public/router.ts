import { RootPage } from "./components/RootPage";
import { OtherPage } from "./components/OtherPage";
import { ChatPage } from "./components/ChatPage";
import { Chat } from "./components/Chat";

export const router = [{
	path: "/",
	component: RootPage,
	routes: [{
		component: OtherPage,
		path: "/:id",
		routes: [{
			component: Chat,
			path: "/chat"
		}]
	}]
}];