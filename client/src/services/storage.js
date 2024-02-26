const KEY = "loggedInUser";

// // * SESSION STORAGE

// export const saveSessionUser = (user) => {
// 	sessionStorage.setItem(KEY, JSON.stringify(user));
// };

// export const loadSessionUser = () => {
// 	return JSON.parse(sessionStorage.getItem(KEY));
// };

// export const removeSessionUser = () => {
// 	sessionStorage.removeItem(KEY);
// };

// * LOCAL STORAGE

export const saveUser = (user) => {
	localStorage.setItem(KEY, JSON.stringify(user));
};

export const loadUser = () => {
	return JSON.parse(localStorage.getItem(KEY));
};

export const removeUser = () => {
	localStorage.removeItem(KEY);
};
