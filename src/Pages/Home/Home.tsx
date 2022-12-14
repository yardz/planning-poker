import { getFirebaseAuth } from "src/Configs/firebase";
import styles from "./Home.module.scss";
import { useAuthState } from "react-firebase-hooks/auth";
import { HomeGameAction } from "./Components";
import { Loading, LoginForm } from "src/Components";

export interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
	const firebaseAuth = getFirebaseAuth();
	const [user, loading] = useAuthState(firebaseAuth);
	if (loading) return <Loading />;
	return (
		<div className={styles.Home} data-testid="Home">
			{user ? <HomeGameAction /> : <LoginForm />}
		</div>
	);
};
