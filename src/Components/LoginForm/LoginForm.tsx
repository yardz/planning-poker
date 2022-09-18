import IconGitHub from "@mui/icons-material/GitHub";
import IconGoogle from "@mui/icons-material/Google";
import { Button } from "@mui/material";
import {
	useAuthState,
	useSignInWithGithub,
	useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { getFirebaseAuth } from "src/Configs/firebase";
import { Loading } from "../Loading";
import styles from "./LoginForm.module.scss";

interface Props {}

export const LoginForm: React.FC<Props> = () => {
	const firebaseAuth = getFirebaseAuth();
	const [user, loading, error] = useAuthState(firebaseAuth);
	const [signInWithGoogle] = useSignInWithGoogle(firebaseAuth);
	const [signInWithGithub] = useSignInWithGithub(firebaseAuth);
	if (user) return null;
	if (loading) return <Loading />;
	return (
		<div className={styles.LoginForm} data-testid="LoginForm">
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
