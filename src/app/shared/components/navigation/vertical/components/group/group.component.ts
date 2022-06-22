// Angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BooleanInput } from '@angular/cdk/coercion';

// rxjs
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Components
import { VerticalNavigationComponent } from '../../vertical.component';

// Services
import { NavigationService } from '@core/services';

// Models
import { NavigationItemModel } from '@shared/models';

@Component({
  selector: 'app-vertical-navigation-group-item',
  templateUrl: './group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerticalNavigationGroupItemComponent implements OnInit, OnDestroy {

  static ngAcceptInputType_autoCollapse: BooleanInput;

  @Input() autoCollapse: boolean;
  @Input() item: NavigationItemModel;
  @Input() name: string;

  private _verticalNavigationComponent: VerticalNavigationComponent;
  private _unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _navigationService: NavigationService ) {}

  ngOnInit(): void {
    // Get the parent navigation component
    this._verticalNavigationComponent = this._navigationService.getComponent(this.name);

    // Subscribe to onRefreshed on the navigation component
    this._verticalNavigationComponent.onRefreshed.pipe(
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

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
