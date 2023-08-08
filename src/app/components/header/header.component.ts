import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private router: Router) {}

  svgImagePath = 'assets/logoHeader.svg';


  onNavigateToHome() {
    this.router.navigateByUrl('/');
  }

  onNavigateToList() {
    this.router.navigateByUrl('/reserva/list');
  }

  onNavigateToNew() {
    this.router.navigateByUrl('reserva/new');
  }
}
