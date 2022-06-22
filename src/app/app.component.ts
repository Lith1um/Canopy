import { Component } from '@angular/core';
import { NavigationItemModel } from '@shared/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Angular Template Project';

  items: NavigationItemModel[] = [
    {
      id: 'home',
      title: 'Home',
      type: 'item',
      url: '/',
      matIcon: 'home'
    },
    {
      id: 'profile',
      title: 'Profile',
      type: 'item',
      url: 'profile',
      matIcon: 'account_circle'
    },
    {
      id: 'settings',
      title: 'Settings',
      type: 'item',
      url: 'settings',
      matIcon: 'settings'
    },
  ];

}
