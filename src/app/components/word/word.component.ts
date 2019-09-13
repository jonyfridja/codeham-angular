import { Word } from './../../models/Word';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {

  @Input() word: Word;
  @Input('disabled') isDisabled: boolean;
  @Input() allRevealed: boolean;
  @Input('animate') shouldAnimate: boolean;

  sizeClasses = ['regular'];
  containerClasses = {};
  constructor() { }

  ngOnInit() {

    if (this.word.word.length <= 4) {
      this.sizeClasses = ['large']
    }

    if (this.word.word.length >= 6) {
      this.sizeClasses = ['medium']
    }
    if (this.word.word.length >= 9) {
      this.sizeClasses = ['small']
    }

    if (this.word.word.length >= 11) {
      this.sizeClasses = ['smaller']
    }
    if (this.word.word.length >= 13) {
      this.sizeClasses = ['smallest']
    }

  }
}
