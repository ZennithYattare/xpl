import { atom, useAtom } from "jotai";

import { saveUser, loadUser, removeUser } from "../services/storage";

import { setToken } from "../services/auth";

export const userAtom = atom(null);

export const useUser = () => {
	const [user] = useAtom(userAtom);

	return user;
};

// * LOCAL STORAGE

export const useLogin = () => {
	const [, setUser] = useAtom(userAtom);

	return async (credentials) => {
		setToken(credentials.token);
		setUser(credentials);
		saveUser(credentials);
	};
};

export const useLogout = () => {
	const [, setUser] = useAtom(userAtom);

	return async () => {
		setUser(null);
		removeUser();
	};
};

export const useInitUser = () => {
	const [, setUser] = useAtom(userAtom);

	return async () => {
		const user = await loadUser();
		if (user) {
			setToken(user.token);
			setUser(user);
		}
	};
};
