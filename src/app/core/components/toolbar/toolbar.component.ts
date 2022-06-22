// Angular
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { LayoutService } from '@core/services';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent {

  @Input()
  title: string;

  constructor(public layoutService: LayoutService) {}

}
