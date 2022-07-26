import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {

  @Input() label: string;
  @Input() length: '11';
  @Input() name: string;
  @Input() type = 'text'; // set default type be text

  focused: boolean;

  onBlur(event: any) {
    const value = event.target.value;

    if (!value) {
      this.focused = false;
    }
  }

  constructor() { }

  ngOnInit() {}

}
