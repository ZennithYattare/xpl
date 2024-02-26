/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// ? * General * ?
import { useInitUser } from "./contexts/UserContext";
import Notification from "./components/Notification";
import NotFound from "./components/NotFound";

// NOTE: ⭐️ User ⭐️ *
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

function App() {
	const initUser = useInitUser();

	useEffect(() => {
		initUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{/* Notification component for rendering alerts */}
			<Notification />
			<Routes>
				{/* ⭐️ USER only routes ⭐️ */}
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/dashboard" element={<Dashboard />} />
				{/* ... */}

				{/* 404 Page Handler */}
				<Route path="*" element={<NotFound />} />
				{/*  */}
			</Routes>
		</>
	);
}

export default App;
