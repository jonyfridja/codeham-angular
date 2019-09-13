import { GameDetails } from './../models/GameDetails';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';


// @Injectable({
//   providedIn: 'root'
// })
export class GameService {
  private STORAGE_KEY = 'game';

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

  auth(password) {
    return this.http.post<Boolean>(environment.authEndpoint, { password })
  }

  saveGameDetails(gameDetails: GameDetails) {
    this.storageService.store(this.STORAGE_KEY, gameDetails);
  }
}
