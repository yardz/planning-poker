import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import { getDatabase, ref, update } from "firebase/database";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useObjectVal } from "react-firebase-hooks/database";
import { getFirebaseAuth } from "src/Configs/firebase";
import { Game } from "src/Types";
import * as yup from "yup";
import styles from "./FormGame.module.scss";
import clone from "lodash/clonedeep";

const validationSchema = yup.object({
	cards: yup.array().of(yup.number().min(0)).min(1).required(),
	password: yup
		.string()
		.min(8, "Password should be of minimum 8 characters length"),
	showVotes: yup.boolean(),
});

const validCards = [0, 1, 2, 3, 5, 8, 13, 20, 40, 100];
const initialCardsState: { [key: number]: boolean } = {};
validCards.forEach((v) => {
	initialCardsState[v] = false;
});

interface Props {}

export const FormGame: React.FC<Props> = () => {
	const db = getDatabase();
	const [cards, setCards] = React.useState(initialCardsState);
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCards({
			...cards,
			[event.target.name]: event.target.checked,
		});
	};
	const firebaseAuth = getFirebaseAuth();
	const [user] = useAuthState(firebaseAuth);

	const [game] = useObjectVal<Game>(ref(db, `games/${user?.uid}`));
	useEffect(() => {
		console.log("DATA");
		const update = clone(initialCardsState);
		game?.cards?.forEach((v) => {
			update[v] = true;
		});
		setCards(update);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [game]);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			password: game?.password || "",
			showVotes: game?.showVotes || false,
			cards: game?.cards || [],
		},
		validationSchema,
		onSubmit: async (values) => {
			if (!user) return;
			const me = {
				uid: user.uid,
				name: "My Name!",
			};
			const game: Partial<Game> = {
				players: [me],
				...values,
				cards: values.cards.map(Number),
			};
			console.log(game);

			return update(ref(db, "games/" + user.uid), game);
		},
	});

	const { setFieldValue } = formik;
	useEffect(() => {
		const selectedCards = Object.keys(cards).filter((v) =>
			Number(cards[Number(v)])
		);
		setFieldValue("cards", selectedCards);
	}, [cards, setFieldValue]);

	if (!user) return null;
	return (
		<div className={styles.FormGame} data-testid="FormGame">
			<Box
				component="form"
				sx={{
					"& > :not(style)": { m: 1 },
				}}
				onSubmit={formik.handleSubmit}
			>
				<TextField
					fullWidth
					variant="filled"
					id="password"
					name="password"
					label="Password"
					type="text"
					value={formik.values.password}
					onChange={formik.handleChange}
					error={formik.touched.password && Boolean(formik.errors.password)}
					helperText={formik.touched.password && formik.errors.password}
				/>

				<FormGroup>
					<FormControlLabel
						control={
							<Switch
								id="showVotes"
								name="showVotes"
								checked={formik.values.showVotes}
								onChange={(e) => {
									console.log(e.target.checked);
									formik.setFieldValue("showVotes", e.target.checked);
								}}
							/>
						}
						label="Show Votes"
					/>
				</FormGroup>

				<FormControl
					required
					error={!!formik.errors.cards}
					component="fieldset"
					sx={{ m: 3 }}
					variant="standard"
				>
					<FormLabel component="legend">Cards Enabled</FormLabel>
					<FormGroup>
						{Object.keys(cards).map((card) => (
							<FormControlLabel
								key={card}
								control={
									<Checkbox
										checked={!!cards[Number(card)]}
										onChange={handleChange}
										name={card}
									/>
								}
								label={card}
							/>
						))}
					</FormGroup>
					<FormHelperText>Choose at least one card</FormHelperText>
				</FormControl>

				<Button color="primary" variant="contained" fullWidth type="submit">
					{!!game ? "Update current game" : "Create a new Game"}
				</Button>
			</Box>
		</div>
	);
};
