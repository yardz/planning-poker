import { getFirebaseAuth } from "src/Configs/firebase";
import styles from "./CreateNewGame.module.scss";
import { useAuthState } from "react-firebase-hooks/auth";
import { FormGame, Loading, LoginForm } from "src/Components";
import { Typography } from "@mui/material";

export interface CreateNewGameProps {}

export const CreateNewGame: React.FC<CreateNewGameProps> = () => {
	const firebaseAuth = getFirebaseAuth();
	const [user, loading] = useAuthState(firebaseAuth);

	if (loading) return <Loading />;
	if (!user) return <LoginForm />;

	return (
		<div className={styles.CreateNewGame} data-testid="CreateNewGame">
			<Typography variant="h3" align="center">
				Create a new Game
			</Typography>

			<div className={styles.configs}>
				<FormGame />
			</div>
		</div>
	);
};
