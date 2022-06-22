// Angular
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

// rxjs
import { ReplaySubject, Subject } from 'rxjs';

// Services
import { NavigationService, UtilsService } from '@core/services';

// Models
import { NavigationItemModel } from '@shared/models';
import { fromResize, ResizeDirection } from '@shared/helpers';

@Component({
  selector: 'app-horizontal-navigation',
  templateUrl: './horizontal.component.html',
  styleUrls: ['./horizontal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HorizontalNavigationComponent implements OnChanges, OnInit, OnDestroy {

  @ViewChild('menu') menu: ElementRef;

  @Input() name: string = UtilsService.randomId();
  @Input() navigation: NavigationItemModel[];

  onRefreshed: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  private groupedItems: NavigationItemModel = {
    id: 'overflow-more',
    title: 'More',
    type: 'group',
    matIcon: 'expand_more',
    children: []
  };

  private _unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(
    private host: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef,
    private _navigationService: NavigationService) {}

  ngOnInit(): void {
    // Make sure the name input is not an empty string
    if (this.name === '') {
      this.name = UtilsService.randomId();
    }
    // Register the navigation component
    this._navigationService.registerComponent(this.name, this);

    // check scrollable content when the window is resized
    fromResize(this.host.nativeElement, { direction: ResizeDirection.Horizontal })
      .subscribe(() => this.checkIfContentFits());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('navigation' in changes) {
      this._changeDetectorRef.markForCheck();
    }
  }

  ngOnDestroy(): void {
    // Deregister the navigation component from the registry
    this._navigationService.deregisterComponent(this.name);

    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  refresh(): void {
    // Mark for check
    this._changeDetectorRef.markForCheck();

    // Execute the observable
    this.onRefreshed.next(true);
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  private checkIfContentFits(): void {
    if (!this.menu || !this.navigation.length) {
      return;
    }

    // sort out the menu items
    this.shouldCollapse()
      ? this.collapseItem()
      : this.expandItem();
  }

  private shouldCollapse(): boolean {
    const menuWidth = this.menu.nativeElement.clientWidth;
    const compWidth = this.host.nativeElement.clientWidth;

    return menuWidth >= compWidth;
  }

  private collapseItem(): void {
    // make sure we don't collapse the final item
    if (this.navigation.length <= 1) {
      return;
    }

    // add the group item if non-existent
    if (this.navigation[this.navigation.length - 1].id !== 'overflow-more') {
      this.navigation.push(this.groupedItems);
    }
    // add the last nav item to the group
    this.navigation[this.navigation.length - 1].children?.unshift(this.navigation[this.navigation.length - 2]);
    this.navigation.splice(this.navigation.length - 2, 1);

    // recurse
    this._changeDetectorRef.detectChanges();
    if (this.shouldCollapse()) {
      this.collapseItem();
    }
  }

  private expandItem(): void {
    // make sure we have items to expand
    if (this.navigation.length === 0) {
      return;
    }

    const lastNavItem = this.navigation[this.navigation.length - 1];
    // check we have a grouped nav item to expand
    if (lastNavItem.id === 'overflow-more') {
      if (lastNavItem.children?.length) {
        const itemToExpand = lastNavItem.children[0];
        this.navigation.splice(this.navigation.length - 1, 0, itemToExpand);
        lastNavItem.children.splice(0, 1);
      }

      if (!lastNavItem.children?.length) {
        this.navigation.splice(this.navigation.length - 1, 1);
      }

      this._changeDetectorRef.detectChanges();
      this.shouldCollapse()
        ? this.collapseItem()
        : this.expandItem();
    }
  }
}
