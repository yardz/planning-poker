import "../styles/globals.css";
import type { AppProps } from "next/app";

import { bootstrap } from "src/Configs";

bootstrap();

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
