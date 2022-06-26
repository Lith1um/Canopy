import { Component, ViewChild } from '@angular/core';
import { ClientStateService, DarkMode } from '@core/services';
import { LayoutComponent } from '@shared/components';
import { NavigationItemModel } from '@shared/models';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  @ViewChild('settingsLayout', { read: LayoutComponent }) settingsLayout: LayoutComponent;

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

  toggleSettingsMenu(): void {
    this.settingsLayout.layoutService.toggleMenu();
  }

  setDarkMode(mode: DarkMode): void {
    this.clientState.darkMode = mode;
  }

}
