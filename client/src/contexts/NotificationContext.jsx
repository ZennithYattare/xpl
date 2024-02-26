import { atom, useAtom } from "jotai";

export const notificationAtom = atom({
	message: null,
	alert: null,
});

export const useNotifier = () => {
	const [, setNotification] = useAtom(notificationAtom);

	const notify = ({ message, alert }) => {
		setNotification({ message, alert });
		setTimeout(() => {
			setNotification({ message: null, alert: null });
		}, 5000); // 5000 milliseconds = 5 seconds
	};

	return notify;
};
