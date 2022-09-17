import { Home, HomeProps } from "src/Pages/Home";

import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const props = {};
	return { props };
};

export default Home;
