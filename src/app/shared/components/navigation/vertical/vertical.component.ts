// Angular
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

// rxjs
import { ReplaySubject } from 'rxjs';

// Models
import { NavigationItemModel } from '@shared/models';

// Services
import { NavigationService, UtilsService } from '@core/services';

@Component({
  selector: 'app-vertical-navigation',
  templateUrl: './vertical.component.html',
  styleUrls: ['./vertical.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerticalNavigationComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {
  static ngAcceptInputType_inner: BooleanInput;
  static ngAcceptInputType_opened: BooleanInput;
  static ngAcceptInputType_transparentOverlay: BooleanInput;

  @Input()
  autoCollapse = true;

  @Input()
  inner = false;

  @Input()
  name: string = UtilsService.randomId();

  @Input()
  navigation: NavigationItemModel[];

  @Input()
  opened = true;

  @Input()
  transparentOverlay = false;

  @Output()
  readonly openedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  itemClicked: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('navigationContent') private _navigationContentEl: ElementRef;

  mode = 'side';
  position = 'left';
  activeAsideItemId: string | null = null;
  onCollapsibleItemCollapsed: ReplaySubject<NavigationItemModel> = new ReplaySubject<NavigationItemModel>(1);
  onCollapsibleItemExpanded: ReplaySubject<NavigationItemModel> = new ReplaySubject<NavigationItemModel>(1);
  onRefreshed: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private _hovered = false;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _navigationService: NavigationService) {}

  @HostBinding('class') get classList(): any {
    return {
      'vertical-navigation-appearance-default': true,
      'vertical-navigation-hover': this._hovered,
      'vertical-navigation-inner': this.inner,
      'vertical-navigation-mode-side': true,
      'vertical-navigation-opened': this.opened,
      'vertical-navigation-position-left': true
    };
  }

  @HostBinding('style') get styleList(): any {
    return {
      'visibility': this.opened ? 'visible' : 'hidden'
    };
  }

  @HostListener('mouseenter')
  private _onMouseenter(): void {
    // Set the hovered
    this._hovered = true;
  }

  @HostListener('mouseleave')
  private _onMouseleave(): void {
    // Set the hovered
    this._hovered = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Inner
    if ( 'inner' in changes ) {
      // Coerce the value to a boolean
      this.inner = coerceBooleanProperty(changes.inner.currentValue);
    }

    // Navigation
    if ( 'navigation' in changes ) {
      // Mark for check
      this._changeDetectorRef.markForCheck();
    }

    // Opened
    if ( 'opened' in changes ) {
      // Coerce the value to a boolean
      this.opened = coerceBooleanProperty(changes.opened.currentValue);

      // Open/close the navigation
      this._toggleOpened(this.opened);
    }

    // Transparent overlay
    if ( 'transparentOverlay' in changes ) {
      // Coerce the value to a boolean
      this.transparentOverlay = coerceBooleanProperty(changes.transparentOverlay.currentValue);
    }
  }

  ngOnInit(): void {
    // Make sure the name input is not an empty string
    if ( this.name === '' ) {
      this.name = UtilsService.randomId();
    }

    // Register the navigation component
    this._navigationService.registerComponent(this.name, this);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      // Return if 'navigation content' element does not exist
      if (!this._navigationContentEl) {
        return;
      }
      // If 'navigation content' element doesn't have
      // perfect scrollbar activated on it...
      if (!this._navigationContentEl.nativeElement.classList.contains('ps')) {
        // Find the active item
        const activeItem = this._navigationContentEl.nativeElement.querySelector('.vertical-navigation-item-active');

        // If the active item exists, scroll it into view
        if (activeItem) {
          activeItem.scrollIntoView();
        }
      }
    });
  }

  ngOnDestroy(): void {
    // Deregister the navigation component from the registry
    this._navigationService.deregisterComponent(this.name);
  }

  refresh(): void {
    // Mark for check
    this._changeDetectorRef.markForCheck();

    // Execute the observable
    this.onRefreshed.next(true);
  }

  open(): void {
    // Return if the navigation is already open
    if (this.opened) {
      return;
    }
    // Set the opened
    this._toggleOpened(true);
  }

  close(): void {
    // Return if the navigation is already closed
    if (!this.opened) {
      return;
    }
    // Set the opened
    this._toggleOpened(false);
  }

  toggle(): void {
    // Toggle
    if ( this.opened ) {
      this.close();
    } else {
      this.open();
    }
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  private _toggleOpened(open: boolean): void {
    // Set the opened
    this.opened = open;

    // Execute the observable
    this.openedChanged.next(open);
  }
}
