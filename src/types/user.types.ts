import User from "../database/Models/User"


export type UserData = Pick<User, "id" | "name">;

export interface UserServiceResponseType {
	getUsers: () => Promise<UserData[]>;
	getUserById: (userId: number) => Promise<UserData>;
	createUserByName: (name: string) => Promise<void>;
}

