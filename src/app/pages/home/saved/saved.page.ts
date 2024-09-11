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
  em ='andresilva2401@gmail.com '
  em1 ='maria424@gmail.com '
  em2 ='luisnava@hotmail.com'
  em3 ='cesarpalaios2325@gmail.com'
  em4= 'luischang25@gmail.com'

  constructor() {}

  ngOnInit() {
    this.saved = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }
}
