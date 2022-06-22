// Angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';

// rxjs
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Components
import { VerticalNavigationComponent } from '../../vertical.component';

// Models
import { NavigationItemModel } from '@shared/models';

// Services
import { NavigationService } from '@core/services';

@Component({
  selector: 'app-vertical-navigation-basic-item',
  templateUrl: './basic.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerticalNavigationBasicItemComponent implements OnInit, OnDestroy {

  @Input() item: NavigationItemModel;
  @Input() name: string;

  private _verticalNavigationComponent: VerticalNavigationComponent;
  private _unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _navigationService: NavigationService) {}

  @HostBinding('class') get classList(): string {
    return this.item.classes ?? '';
  }

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

  handleClick(item?: NavigationItemModel): void {
    this._verticalNavigationComponent.itemClicked.emit();
    if (item?.function) {
      item.function();
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
