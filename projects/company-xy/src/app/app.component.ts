import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'home-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'home';

  constructor(router: Router){
  }
}
