import { Component,  EventEmitter,  Input, Output, } from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.html',
  styleUrl: './child.scss',
})
export class Child {
  @Output() sendData = new EventEmitter<string>(); // pass data child to parent using @output() and EventEmitter
  @Input() userName: string = '';



  message = 'Hello Parent, I am Child!';

  passToParent() {
    this.sendData.emit(this.message);
  }
}
