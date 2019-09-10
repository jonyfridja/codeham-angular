import { Word } from './Word';

export interface GameDetails {
  words: Word[];
  whoseTurn: string;
  playersCount: number;
  isGameRunning: boolean;
}
