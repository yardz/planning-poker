import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { isServer } from "src/helpers";
// TODO: Add SDKs for Firebase products that you want to use

export const initializeFirebase = () => {
	const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_APP_FIREBASE || "");
	// Initialize Firebase
	const app = initializeApp(firebaseConfig);
	if (!isServer) {
		const analytics = getAnalytics(app);
	}
};
