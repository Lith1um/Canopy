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
    }
  ];

}
