import { Component } from '@angular/core';
import { ClientStateService, DarkMode } from '@core/services';
import { NavigationItemModel } from '@shared/models';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent {

  title = 'Angular Template Project';

  darkMode = DarkMode;
  constructor(public clientState: ClientStateService) {}

  items: NavigationItemModel[] = [
    {
      id: 'home',
      title: 'Home',
      type: 'item',
      url: '/app',
      exactMatch: true,
      matIcon: 'home'
    },
    {
      id: 'form-example',
      title: 'Form Examples',
      type: 'item',
      url: 'form-example',
      matIcon: 'edit_note'
    },
    {
      id: 'dialog-example',
      title: 'Dialog Examples',
      type: 'item',
      url: 'dialog-example',
      matIcon: 'web_asset'
    },
    {
      id: 'login-example',
      title: 'Login Example',
      type: 'item',
      url: 'login-example',
      matIcon: 'login'
    }
  ];

  setDarkMode(mode: DarkMode): void {
    this.clientState.darkMode = mode;
  }

}
