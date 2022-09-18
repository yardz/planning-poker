import { CreateNewGame, CreateNewGameProps } from "src/Pages/CreateNewGame";

import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps<CreateNewGameProps> = async () => {
	const props = {};
	return { props };
};

export default CreateNewGame;
