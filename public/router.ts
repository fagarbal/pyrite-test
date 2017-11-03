import { LoginPage, MainPage, RegisterPage } from "./pages";

export const router = [{
	path: "/login",
	component: LoginPage
},{
	path: "/register",
	component: RegisterPage
},{
	path: "/main",
	component: MainPage
}];