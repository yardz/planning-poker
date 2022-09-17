import styles from "./Loading.module.scss";
import CircularProgress from "@mui/material/CircularProgress";

interface Props {}

export const Loading: React.FC<Props> = () => {
	return (
		<div className={styles.Loading} data-testid="Loading">
			<CircularProgress />
		</div>
	);
};
