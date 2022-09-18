import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import styles from "./HomeGameActionCard.module.scss";

interface Props {
	title: string | React.ReactNode;
	content: React.ReactNode;
	action: {
		label: string | React.ReactNode;
		onClick: () => void;
	};
}

export const HomeGameActionCard: React.FC<Props> = ({
	title,
	content,
	action,
}) => {
	return (
		<div className={styles.HomeGameActionCard} data-testid="HomeGameActionCard">
			<Card className={styles.card} variant="outlined">
				<>
					<CardContent>
						<Typography variant="h5" component="div">
							{title}
						</Typography>
						<Typography component="div" variant="body2">
							{content}
						</Typography>
					</CardContent>
					<CardActions>
						<Button onClick={action.onClick} size="small">
							{action.label}
						</Button>
					</CardActions>
				</>
			</Card>
		</div>
	);
};
