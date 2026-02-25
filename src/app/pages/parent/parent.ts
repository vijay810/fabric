import { Component, Input } from '@angular/core';
import { Child } from "../child/child";

@Component({
  selector: 'app-parent',
  imports: [Child],
  templateUrl: './parent.html',
  styleUrl: './parent.scss',
})
export class Parent {
  // pass data from parent to child using @input
  @Input() userName: string = '';
  parentName = 'Vijay Mane';

  // receiveData form child0
  receivedData = '';

  getChildData(event: string) {
    this.receivedData = event;
  }
}
