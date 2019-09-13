import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval, fromEvent } from 'rxjs';
import { debounce,  } from 'rxjs/operators';
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
    this.password += event.key;
    // console.log(event)
    // console.log('password is', this.password);
    if(event.code ==="Escape") {
      this.password = '';
    }
    const debouncePipe = this.gameService.auth(this.password).pipe(debounce(() => interval(1000)));
    this.subscription = debouncePipe.subscribe(ans => {
      if (ans) {
        console.log('more words enabled');
      } else {
        console.log('try again');
      }
    })
  }
  ngOnDestroy() {
    document.querySelector('body').removeEventListener('keydown', this.addAuthListener);
  }
}
