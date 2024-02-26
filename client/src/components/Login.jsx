import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

import { useLogin } from "../contexts/UserContext";
import { login } from "../services/auth";
import { useNotifier } from "../contexts/NotificationContext";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const notify = useNotifier();
	const navigate = useNavigate();
	const doLogin = useLogin();

	const loginMutation = useMutation({
		mutationFn: login,
		onSuccess: (data) => {
			doLogin(data);
			setUsername("");
			setPassword("");
			notify({ message: "Logged in successfully", alert: "success" });
			navigate("/dashboard");
		},
		onError: (error) => {
			setUsername("");
			setPassword("");
			notify({
				message:
					error.response?.data?.message ||
					error.response?.data?.error,
				alert: "error",
			});
		},
	});

	const handleLogin = async (event) => {
		event.preventDefault();

		loginMutation.mutate({ username, password });
	};

	return (
		<>
			<form>
				<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:px-12 lg:px-24 lg:py-24">
					<div className="mx-auto transform justify-center rounded-lg bg-white text-left align-bottom transition-all sm:w-full sm:max-w-2xl sm:align-middle">
						<div className="mx-auto grid grid-cols-1 flex-wrap items-center justify-center rounded-xl shadow-xl lg:grid-cols-2">
							<div className="w-full px-6 py-3">
								<div>
									<div className="mt-3 text-left sm:mt-5">
										<div className="inline-flex w-full items-center">
											<h3 className="l eading-6 text-lg font-bold text-neutral-600 lg:text-5xl">
												Login
											</h3>
										</div>
									</div>
								</div>

								<div className="mt-6 space-y-2">
									<div>
										<label for="email" className="sr-only">
											Username
										</label>
										<input
											type="text"
											name="email"
											id="email"
											value={username}
											className="block w-full transform rounded-lg border border-transparent bg-gray-50 px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
											placeholder="Enter your username"
											onChange={(e) =>
												setUsername(e.target.value)
											}
										></input>
									</div>
									<div>
										<label
											for="password"
											className="sr-only"
										>
											Password
										</label>
										<input
											type="password"
											name="password"
											id="password"
											value={password}
											className="block w-full transform rounded-lg border border-transparent bg-gray-50 px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
											placeholder="Enter your password"
											onChange={(e) =>
												setPassword(e.target.value)
											}
										></input>
									</div>
									<div className="mt-4 flex flex-col lg:space-y-2">
										<button
											type="button"
											onClick={handleLogin}
											className="flex w-full transform items-center justify-center rounded-xl bg-blue-600 px-10 py-4 text-center text-base font-medium text-white transition duration-500 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
										>
											Login
										</button>
										<a
											href="/register"
											type="button"
											className="inline-flex justify-center py-4 text-base font-medium text-gray-500 hover:text-neutral-600 focus:text-blue-600 focus:outline-none sm:text-sm"
										>
											{" "}
											Register{" "}
										</a>
									</div>
								</div>
							</div>
							<div className="order-first hidden w-full lg:block"></div>
						</div>
					</div>
				</div>
			</form>
		</>
	);
};

export default Login;
