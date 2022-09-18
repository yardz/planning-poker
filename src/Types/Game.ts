import { Player } from "./Player";
import { Points, UID } from "./Primite";

export interface Game {
	players: Player[];
	cards: Points[];
	votes: { [uid: UID]: number };
	showVotes: boolean;
	password?: string;
}
