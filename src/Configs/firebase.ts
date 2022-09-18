import { FirebaseApp, initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { isServer } from "src/Utils";

let _firebaseApp: FirebaseApp;

export const initializeFirebase = () => {
	// Initialize Firebase
	if (_firebaseApp) return;
	const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_APP_FIREBASE || "");
	_firebaseApp = initializeApp(firebaseConfig);
};

export const getFirebaseApp = () => {
	initializeFirebase();
	return _firebaseApp;
};

export const getFirebaseAuth = () => {
	const firebaseApp = getFirebaseApp();
	return getAuth(firebaseApp);
};

export const getFirebaseAnalytics = () => {
	if (!isServer) return;
	const firebaseApp = getFirebaseApp();
	return getAnalytics(firebaseApp);
};

export const getFirebaseRealTimeDatabase = () => {
	const firebaseApp = getFirebaseApp();
	return getDatabase(firebaseApp);
};
