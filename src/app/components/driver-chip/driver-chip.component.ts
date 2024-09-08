import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-driver-chip',
  templateUrl: './driver-chip.component.html',
  styleUrls: ['./driver-chip.component.scss'],
})
export class DriverChipComponent {
  @Input() fullName: string = '';
  @Input() phoneNumber: string = '';
  @Input() ci: string = '';
  @Input() email: string = '';
  @Input() profilePhoto: string = '';
  @Input() vehicleModel: string = '';
  @Input() licensePlate: string = '';
  constructor() { }

}
