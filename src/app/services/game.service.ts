import { GameDetails } from './../models/GameDetails';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';
import { Word } from '../models/Word';


// @Injectable({
//   providedIn: 'root'
// })
export class GameService {
  private STORAGE_KEY = 'game';

  extraWords: string[] = null;
  gameKey: string;
  endpoint = environment.gameEndpoint;
  constructor(private http: HttpClient, private storageService: StorageService) {
  }

  getGameDetails(gameId: string): Observable<GameDetails> {
    const storedGameDetails = this.storageService.load(this.STORAGE_KEY);
    if (!storedGameDetails || !storedGameDetails.isGameRunning) {
      return this.http.get<GameDetails>(
        `${this.endpoint}${gameId}`
      );
    } else return of(storedGameDetails);
  }

  moreWords(password) {
    return this.http.post<string[]>(environment.moreWordsEndpoint, { password })
  }

  addWords(words: string[]): void {
    this.extraWords = words;
  }

  saveGameDetails(gameDetails: GameDetails) {
    this.storageService.store(this.STORAGE_KEY, gameDetails);
  }
}
