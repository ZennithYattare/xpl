import axios from "axios";
const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/auth`;

let token = null;

export const setToken = (newToken) => {
	token = `bearer ${newToken}`;
};

export const login = async (credentials) => {
	const response = await axios.post(`${baseUrl}/login`, credentials);
	return response.data;
};

export const register = async (credentials) => {
	const response = await axios.post(`${baseUrl}/register`, credentials);
	return response.data;
};
