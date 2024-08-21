import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.scss'],
})
export class ToggleSwitchComponent {
  isOn: boolean = false;

  @Output() statusChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  toggleSwitch() {
    this.isOn = !this.isOn;
    this.statusChange.emit(this.isOn);
  }
}
