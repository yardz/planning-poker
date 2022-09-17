import { Header } from "./Components";
import styles from "./Template.module.scss";

interface Props {
	name: "default" | "dark"; // future templates names
	children?: React.ReactNode;
}

export const Template: React.FC<Props> = ({ children }) => {
	return (
		<div className={styles.Template} data-testid="Template">
			<Header />
			<div className={styles.container}>{children}</div>
		</div>
	);
};
