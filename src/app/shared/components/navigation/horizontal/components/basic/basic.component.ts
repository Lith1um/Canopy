// Angular
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';

// rxjs
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Components
import { HorizontalNavigationComponent } from '../../horizontal.component';

// Services
import { NavigationService } from '@core/services';

// Models
import { NavigationItemModel } from '@shared/models';

@Component({
  selector: 'app-horizontal-navigation-basic-item',
  templateUrl: './basic.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HorizontalNavigationBasicItemComponent implements OnInit, OnDestroy {

  @Input() item: NavigationItemModel;
  @Input() name: string;

  private _horizontalNavigationComponent: HorizontalNavigationComponent;
  private _unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _navigationService: NavigationService) {}

  ngOnInit(): void {
    // Get the parent navigation component
    this._horizontalNavigationComponent = this._navigationService.getComponent(this.name);

    // Subscribe to onRefreshed on the navigation component
    this._horizontalNavigationComponent.onRefreshed.pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe(() => {
      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
