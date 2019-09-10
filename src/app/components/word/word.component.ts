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
  classes = ['regular'];
  constructor() { }

  ngOnInit() {
    if (this.word.word.length >= 8) {
      this.classes = ['small']
    }

    if (this.word.word.length >= 11) {
      this.classes = ['smaller']
    }
    if (this.word.word.length >= 13) {
      this.classes = ['smallest']
    }

  }
}
