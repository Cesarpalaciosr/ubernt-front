import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.page.html',
  styleUrls: ['./saved.page.scss'],
})
export class SavedPage implements OnInit {
  public saved!: string;
  private activatedRoute = inject(ActivatedRoute);
  user1 ={ 
  fullName      : 'Andres Alverez',
  phoneNumber   :'04146962526',
  ci            :'32258654',
  email         :'andresilva2401@gmail.com',
  profilePhoto  :'',
  vehicleModel  :'',
  licensePlate  : ''
}


  constructor() {}

  ngOnInit() {
    this.saved = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }
}
