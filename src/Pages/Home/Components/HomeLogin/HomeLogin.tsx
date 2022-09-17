import { getFirebaseAuth } from "src/Configs/firebase";
import styles from "./HomeLogin.module.scss";
import { useAuthState } from "react-firebase-hooks/auth";
import {
	useSignInWithGoogle,
	useSignInWithGithub,
} from "react-firebase-hooks/auth";
import { Button } from "@mui/material";
import IconGoogle from "@mui/icons-material/Google";
import IconGitHub from "@mui/icons-material/GitHub";

interface Props {}

export const HomeLogin: React.FC<Props> = () => {
	const firebaseAuth = getFirebaseAuth();
	const [user, loading, error] = useAuthState(firebaseAuth);
	const [signInWithGoogle] = useSignInWithGoogle(firebaseAuth);
	const [signInWithGithub] = useSignInWithGithub(firebaseAuth);
	if (user) return null;
	return (
		<div className={styles.HomeLogin} data-testid="HomeLogin">
			<Button
				className={styles.btnGoogle}
				variant="contained"
				onClick={() => {
					signInWithGoogle();
				}}
			>
				<IconGoogle />
				&nbsp; Signin With Google
			</Button>
			<Button
				className={styles.btnGitHub}
				variant="contained"
				onClick={() => {
					signInWithGithub();
				}}
			>
				<IconGitHub />
				&nbsp; Signin With GitHub
			</Button>
		</div>
	);
};
