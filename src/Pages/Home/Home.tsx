import { getFirebaseAuth } from "src/Configs/firebase";
import styles from "./Home.module.scss";
import { useAuthState } from "react-firebase-hooks/auth";
import { HomeLogin, HomeGameAction } from "./Components";
import { Loading } from "src/Components";

export interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
	const firebaseAuth = getFirebaseAuth();
	const [user, loading] = useAuthState(firebaseAuth);
	if (loading) return <Loading />;
	return (
		<div className={styles.Home} data-testid="Home">
			{!user && <HomeLogin />}
			{user && <HomeGameAction />}
		</div>
	);
};
