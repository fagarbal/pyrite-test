export type LoginResponse = {
	token: string;
};

export type RegisterResponse = {
	success: number;
};

export interface AuthService {
	login(username: string, password: string): Promise<LoginResponse>;
	register(username: string, password: string): Promise<RegisterResponse>;
};
