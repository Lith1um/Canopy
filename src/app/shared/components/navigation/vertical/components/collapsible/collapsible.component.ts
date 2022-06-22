// Angular
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BooleanInput } from '@angular/cdk/coercion';

// rxjs
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

// Components
import { VerticalNavigationComponent } from '../../vertical.component';

// Services
import { NavigationService } from '@core/services';

// Models
import { NavigationItemModel } from '@shared/models';

@Component({
  selector: 'app-vertical-navigation-collapsible-item',
  templateUrl: './collapsible.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerticalNavigationCollapsibleItemComponent implements OnInit, OnDestroy {

  static ngAcceptInputType_autoCollapse: BooleanInput;

  @Input()
  autoCollapse: boolean;

  @Input()
  item: NavigationItemModel;

  @Input()
  name: string;

  isCollapsed = true;
  isExpanded = false;
  private _verticalNavigationComponent: VerticalNavigationComponent;
  private _unsubscribeAll: Subject<void> = new Subject<void>();

  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    private _navigationService: NavigationService) {}

  @HostBinding('class') get classList(): any {
    const classes: { [key: string]: boolean } = {};
    this.item.classes?.split(' ').forEach((itemClass) => classes[`${itemClass}`] = true);
    return {
      ...classes,
      'vertical-navigation-item-collapsed': this.isCollapsed,
      'vertical-navigation-item-expanded': this.isExpanded,
    };
  }

  ngOnInit(): void {
    // Get the parent navigation component
    this._verticalNavigationComponent = this._navigationService.getComponent(this.name);

    // If the item has a children that has a matching url with the current url, expand...
    if (this._hasActiveChild(this.item, this._router.url)) {
      this.expand();
    } else {
      // If the autoCollapse is on, collapse...
      if (this.autoCollapse) {
        this.collapse();
      }
    }

    // Listen for the onCollapsibleItemCollapsed from the service
    this._verticalNavigationComponent.onCollapsibleItemCollapsed
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((collapsedItem) => {
        // Check if the collapsed item is null
        if (collapsedItem === null) {
          return;
        }

        // Collapse if this is a children of the collapsed item
        if (this._isChildrenOf(collapsedItem, this.item)) {
          this.collapse();
        }
      });

    // Listen for the onCollapsibleItemExpanded from the service if the autoCollapse is on
    if (this.autoCollapse) {
      this._verticalNavigationComponent.onCollapsibleItemExpanded
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((expandedItem) => {
          // Check if the expanded item is null
          if (expandedItem === null) {
            return;
          }

          // Check if this is a parent of the expanded item
          if (this._isChildrenOf(this.item, expandedItem)) {
            return;
          }

          // Check if this has a children with a matching url with the current active url
          if (this._hasActiveChild(this.item, this._router.url)) {
            return;
          }

          // Check if this is the expanded item
          if (this.item === expandedItem) {
            return;
          }

          // If none of the above conditions are matched, collapse this item
          this.collapse();
        });
    }

    // Attach a listener to the NavigationEnd event
    this._router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((event: NavigationEnd) => {
        // If the item has a children that has a matching url with the current url, expand...
        if (this._hasActiveChild(this.item, event.urlAfterRedirects)) {
          this.expand();
        } else {
          // If the autoCollapse is on, collapse...
          if (this.autoCollapse) {
            this.collapse();
          }
        }
      });

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

  collapse(): void {
    // Return if the item is already collapsed
    if (this.isCollapsed) {
      return;
    }

    // Collapse it
    this.isCollapsed = true;
    this.isExpanded = !this.isCollapsed;

    // Mark for check
    this._changeDetectorRef.markForCheck();

    // Execute the observable
    this._verticalNavigationComponent.onCollapsibleItemCollapsed.next(this.item);
  }

  expand(): void {
    // Return if the item is already expanded
    if (!this.isCollapsed) {
      return;
    }

    // Expand it
    this.isCollapsed = false;
    this.isExpanded = !this.isCollapsed;

    // Mark for check
    this._changeDetectorRef.markForCheck();

    // Execute the observable
    this._verticalNavigationComponent.onCollapsibleItemExpanded.next(this.item);
  }

  toggleCollapsible(): void {
    // Toggle collapse/expand
    if (this.isCollapsed) {
      this.expand();
    } else {
      this.collapse();
    }
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  private _hasActiveChild(item: NavigationItemModel, currentUrl: string): boolean {
    const children = item.children;

    if (!children) {
      return false;
    }

    for (const child of children) {
      if (child.children) {
        if (this._hasActiveChild(child, currentUrl)) {
          return true;
        }
      }
      // Check if the child has a url and is active
      if (child.url) {
        const hasActiveChild = child.exactMatch
          ? currentUrl === child.url
          : currentUrl.includes(child.url);

        if (hasActiveChild) {
          return true;
        }
      }
    }
    return false;
  }

  private _isChildrenOf(parent: NavigationItemModel, item: NavigationItemModel): boolean {
    const children = parent.children;

    if (!children) {
      return false;
    }

    if (children.indexOf(item) > -1) {
      return true;
    }

    for (const child of children) {
      if (child.children) {
        if (this._isChildrenOf(child, item)) {
          return true;
        }
      }
    }

    return false;
  }
}
