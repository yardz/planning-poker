import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface Props {}

export const HomeGameActionCard: React.FC<Props> = () => {
	return (
		<div data-testid="HomeGameActionCard">
			<Box sx={{ minWidth: 275 }}>
				<Card variant="outlined">
					<>
						<CardContent>
							<Typography
								sx={{ fontSize: 14 }}
								color="text.secondary"
								gutterBottom
							>
								Word of the Day
							</Typography>
							<Typography variant="h5" component="div">
								be . nev . o . lent
							</Typography>
							<Typography sx={{ mb: 1.5 }} color="text.secondary">
								adjective
							</Typography>
							<Typography variant="body2">
								well meaning and kindly.
								<br />
								{'"a benevolent smile"'}
							</Typography>
						</CardContent>
						<CardActions>
							<Button size="small">Learn More</Button>
						</CardActions>
					</>
				</Card>
			</Box>
			<br />
			Join a Game
		</div>
	);
};
