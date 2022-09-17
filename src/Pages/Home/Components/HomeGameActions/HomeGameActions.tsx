import { useAuthState } from "react-firebase-hooks/auth";
import { getFirebaseAuth } from "src/Configs/firebase";
import styles from "./HomeGameActions.module.scss";

interface Props {}

export const HomeGameAction: React.FC<Props> = () => {
	const firebaseAuth = getFirebaseAuth();
	const [user] = useAuthState(firebaseAuth);

	if (!user) return null;
	return (
		<div className={styles.HomeGameAction} data-testid="HomeGameAction">
			Create a Game / Join a Game
		</div>
	);
};
