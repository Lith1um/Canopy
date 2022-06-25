// Angular
import {
  Component,
  Input,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';

// Types
import { AlertType } from '@shared/models';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent {

  @Input()
  type: AlertType = 'error';

  @Input()
  container = true;

  icons: {[level: string]: string} = {
    'primary': 'check_circle',
    'accent': 'check_circle',
    'warn': 'warning',
    'basic': 'check_circle',
    'info': 'info',
    'success': 'check_circle',
    'warning': 'warning',
    'error': 'cancel'
  };

  /**
   * classes for message box
   */
  get classList(): any {
    return {
      'alert': true,
      'alert--no-container': !this.container,
      [`alert-level-${this.type}`]: this.type,
    };
  }

}
