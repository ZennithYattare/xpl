import axios from "axios";
const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/order`;

export const getUserOrders = async (token) => {
	const response = await axios.get(`${baseUrl}/user`, {
		headers: {
			Authorization: `bearer ${token}`,
		},
	});
	return response.data;
};
