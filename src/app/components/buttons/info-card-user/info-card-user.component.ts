import { Component, OnInit } from '@angular/core';
import { personOutline, chevronForwardOutline } from 'ionicons/icons';

@Component({
  selector: 'app-info-card-user',
  templateUrl: './info-card-user.component.html',
  styleUrls: ['./info-card-user.component.scss'],
})
export class InfoCardUserComponent  implements OnInit {
  personOutlineIcon = personOutline;
  arrowChevron = chevronForwardOutline;
  constructor() { }

  ngOnInit() {}

}
