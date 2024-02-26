import { useAtom } from "jotai";
import { notificationAtom } from "../contexts/NotificationContext";

const Notification = () => {
	const [notification] = useAtom(notificationAtom);

	const { message, alert } = notification;

	if (message === null) {
		return null;
	}

	const Success = () => {
		return (
			<section>
				<div className="absolute right-0 z-10 mx-auto mt-4 max-w-7xl px-5 py-12 md:px-12">
					<div className="rounded-r-xl border-l-4 border-green-600 bg-green-50 bg-opacity-80 p-6">
						<div className="flex">
							<div className="flex-shrink-0">
								<svg
									className="h-5 w-5 text-green-500"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
										clipRule="evenodd"
									></path>
								</svg>
							</div>
							<div className="ml-3">
								<div className="text-sm text-green-700">
									<p>{message}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	};

	const Error = () => {
		return (
			<section>
				<div className="absolute right-0 z-10 mx-auto mt-4 max-w-7xl px-5 py-12 md:px-12">
					<div className="rounded-r-xl border-l-4 border-red-500 bg-red-50 bg-opacity-80 p-6">
						<div className="flex">
							<div className="flex-shrink-0">
								<svg
									className="h-5 w-5 text-red-400"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
										clipRule="evenodd"
									></path>
								</svg>
							</div>
							<div className="ml-3">
								<div className="text-sm text-red-600">
									<p>{message}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	};

	return alert === "error" ? <Error /> : <Success />;
};

export default Notification;
