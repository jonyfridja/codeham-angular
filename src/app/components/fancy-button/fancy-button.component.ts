import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-fancy-button',
  templateUrl: './fancy-button.component.html',
  styleUrls: ['./fancy-button.component.scss']
})
export class FancyButtonComponent implements OnInit {
  @Input('disabled') isDisabled: boolean;
  
  constructor() { }

  ngOnInit() {
  }

}
