import { Component } from '@angular/core';

@Component({
  selector: 'app-alert-page',
  templateUrl: './alert-page.component.html'
})
export class AlertPageComponent {

  alertCode = `
<app-alert [type]="'primary'">
  <span alertTitle>Primary alert</span>
  Thank you for joining our newsletter
</app-alert>`;

}
