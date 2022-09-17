import type { AppProps } from "next/app";
import { bootstrap } from "src/Configs";
import CssBaseline from "@mui/material/CssBaseline";
import Head from "next/head";
import { Template } from "src/Template";

bootstrap();

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Planning Poker - OpenSource</title>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			<CssBaseline />

			<Template name="default">
				<Component {...pageProps} />
			</Template>
		</>
	);
}

export default MyApp;
