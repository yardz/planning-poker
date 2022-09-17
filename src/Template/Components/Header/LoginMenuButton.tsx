import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import {
	useAuthState,
	useSignInWithGithub,
	useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { getFirebaseAuth } from "src/Configs/firebase";

export const LoginMenuButton: React.FC = () => {
	const firebaseAuth = getFirebaseAuth();
	const [user] = useAuthState(firebaseAuth);
	const [signInWithGoogle] = useSignInWithGoogle(firebaseAuth);
	const [signInWithGithub] = useSignInWithGithub(firebaseAuth);

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const onpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const closeMenu = () => {
		setAnchorEl(null);
	};
	if (user) return null;
	return (
		<div>
			<Button
				id="basic-button"
				variant="outlined"
				color="inherit"
				aria-controls={open ? "basic-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={onpenMenu}
			>
				Login
			</Button>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={closeMenu}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
			>
				<MenuItem
					onClick={async () => {
						await signInWithGoogle();
						closeMenu();
					}}
				>
					Google
				</MenuItem>
				<MenuItem
					onClick={async () => {
						await signInWithGithub();
						closeMenu();
					}}
				>
					GitHub
				</MenuItem>
			</Menu>
		</div>
	);
};
