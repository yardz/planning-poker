import { getFirebaseAuth } from "src/Configs/firebase";
import styles from "./CreateNewGame.module.scss";
import { useAuthState } from "react-firebase-hooks/auth";
import { Loading, LoginForm } from "src/Components";

export interface CreateNewGameProps {}

export const CreateNewGame: React.FC<CreateNewGameProps> = () => {
	const firebaseAuth = getFirebaseAuth();
	const [user, loading] = useAuthState(firebaseAuth);

	if (loading) return <Loading />;
	if (!user) return <LoginForm />;

	return (
		<div className={styles.CreateNewGame} data-testid="CreateNewGame">
			FORM CREATE A NEW GAME
		</div>
	);
};
