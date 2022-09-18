import Router from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirebaseAuth } from "src/Configs/firebase";
import { HomeGameActionCard } from "../HomeGameActionCard";
import styles from "./HomeGameActions.module.scss";
import TextField from "@mui/material/TextField";
import { useState } from "react";

interface Props {}

export const HomeGameAction: React.FC<Props> = () => {
	const firebaseAuth = getFirebaseAuth();
	const [user] = useAuthState(firebaseAuth);
	const [gameCode, setGameCode] = useState("");

	if (!user) return null;
	return (
		<div className={styles.HomeGameAction} data-testid="HomeGameAction">
			<div>
				<HomeGameActionCard
					title="Create a New Game"
					content={<>Click here to start a new game.</>}
					action={{
						label: "Create New Game",
						onClick: () => {
							Router.push("/create-new-game");
						},
					}}
				/>
			</div>
			<div>
				<HomeGameActionCard
					title="Join a Game"
					content={
						<>
							To join a game you need a game code.
							<br />
							<br />
							<TextField
								label="Game Code"
								variant="filled"
								value={gameCode}
								onChange={(e) => setGameCode(e.target.value)}
							/>
						</>
					}
					action={{
						label: "Joint a Game",
						onClick: () => {
							console.log({ gameCode });
						},
					}}
				/>
			</div>
		</div>
	);
};
