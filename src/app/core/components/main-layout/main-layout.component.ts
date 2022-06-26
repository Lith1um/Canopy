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
      id: 'pages',
      title: 'Pages',
      subtitle: 'Custom made page designs',
      type: 'group',
      children: [
        {
          id: 'login',
          title: 'Login Screen',
          type: 'item',
          url: 'login-page',
          matIcon: 'login'
        }
      ]
    },
    {
      id: 'ui',
      title: 'User Interface',
      subtitle: 'Building blocks of the UI & UX',
      type: 'group',
      children: [
        {
          id: 'form-page',
          title: 'Forms',
          type: 'item',
          url: 'form-page',
          matIcon: 'edit_note'
        },
        {
          id: 'dialogs',
          title: 'Dialogs',
          type: 'item',
          url: 'dialogs',
          matIcon: 'web_asset'
        }
      ]
    },
    {
      id: 'components',
      title: 'Components',
      subtitle: 'UI elements for all your needs',
      type: 'group',
      children: [
        {
          id: 'alerts',
          title: 'Alerts',
          type: 'item',
          url: 'alerts',
          matIcon: 'lightbulb'
        }
      ]
    }
  ];

  setDarkMode(mode: DarkMode): void {
    this.clientState.darkMode = mode;
  }

}
