import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval, fromEvent } from 'rxjs';
import { debounce, } from 'rxjs/operators';
import { GameService } from 'src/app/services/game.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  password: String;
  subscription: Subscription;
  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.password = '';
    document.querySelector('body').addEventListener('keydown', this.addAuthListener.bind(this));
  }

  async addAuthListener(event: KeyboardEvent) {
    if (event.key.length === 1) this.password += event.key;
    if (event.code === "Escape") {
      this.password = '';
      console.log('reset txt');
    }
    this.subscription = this.gameService.moreWords(this.password)
      .subscribe((words: string[]) => {
        console.log('added letter (to remove current pass press Esc)');
        if (words) {
          console.log('Added more words, press next game!');
          this.gameService.addWords(words);
        }
      })
  }
  ngOnDestroy() {
    document.querySelector('body').removeEventListener('keydown', this.addAuthListener);
  }
}
