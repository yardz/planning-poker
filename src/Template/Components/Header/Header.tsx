import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirebaseAuth } from "src/Configs/firebase";
import styles from "./Header.module.scss";
import { LoginMenuButton } from "./LoginMenuButton";

interface Props {}

export const Header: React.FC<Props> = () => {
	const firebaseAuth = getFirebaseAuth();
	const [user] = useAuthState(firebaseAuth);

	return (
		<div className={styles.Header} data-testid="Header">
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ mr: 2 }}
						>
							<MenuIcon />
						</IconButton>

						<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
							Planning Poker
						</Typography>

						{user && (
							<Button
								variant="outlined"
								color="inherit"
								onClick={() => {
									firebaseAuth.signOut();
								}}
							>
								Logout
							</Button>
						)}
						{!user && <LoginMenuButton />}
					</Toolbar>
				</AppBar>
			</Box>
		</div>
	);
};
