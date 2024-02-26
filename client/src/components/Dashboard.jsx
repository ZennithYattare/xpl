import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

import { useUser } from "../contexts/UserContext";
import { useNotifier } from "../contexts/NotificationContext";
import { getUserOrders } from "../services/order";

const Dashboard = () => {
	const queryClient = useQueryClient();
	const notify = useNotifier();
	const user = useUser();

	const { data, isLoading, isFetching, isError, error } = useQuery({
		queryKey: ["userOrders"],
		queryFn: () => getUserOrders(user.token),
		retry: 5,
		retryDelay: 1000,
	});

	console.log(data);

	const TableRowLoading = () => (
		// * TABLE ROW LOADING COMPONENT
		<tr className="animate-pulse">
			<td className="flex items-center gap-x-3 whitespace-nowrap px-6 py-3">
				<div className="h-10 w-10 rounded-full bg-gray-300 "></div>
				<span className="mt-4 h-2 w-48 rounded-lg bg-gray-200"></span>
			</td>
			<td className="whitespace-nowrap px-6 py-4">
				<p className="mt-4 h-2 w-48 rounded-lg bg-gray-200"></p>
			</td>
			<td className="whitespace-nowrap px-6 py-4">
				<p className="mt-4 h-2 w-48 rounded-lg bg-gray-200"></p>
			</td>
			<td className="whitespace-nowrap px-6 text-right">
				<p className="mt-4 h-2 w-48 rounded-lg bg-gray-200"></p>
			</td>
		</tr>
	);

	return <div>Dashboard</div>;
};

export default Dashboard;
