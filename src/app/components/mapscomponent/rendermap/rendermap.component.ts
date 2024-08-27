import { Component, OnInit } from '@angular/core';
import { AuthInterceptor } from 'src/app/services/auth.interceptor';

@Component({
  selector: 'app-rendermap',
  templateUrl: './rendermap.component.html',
  styleUrls: ['./rendermap.component.scss'],
})
export class RendermapComponent  implements OnInit {
  
  constructor(private authInterceptor : AuthInterceptor ) { }
  userRole: string | null = null;

  async ngOnInit() {
    this.userRole = await this.authInterceptor.getRole();
    console.log(this.userRole);
    
  }

}
