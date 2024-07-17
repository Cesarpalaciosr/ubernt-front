import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  public schedule!: string;
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);  // Inyectar Router

  constructor() {}

  ngOnInit() {
    this.schedule = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }
}