// Angular
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

// Models
import { NavigationItemModel } from '@shared/models';

// Services
import { LayoutService } from '@shared/services';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [LayoutService]
})
export class LayoutComponent implements OnInit, OnChanges {

  @Input()
  navigationItems: NavigationItemModel[];

  @Input()
  menuTitle: string;

  @Input()
  toolbarTitle: string;

  @Input()
  showToolbar = true;

  @Input()
  autoCollapseMenu = true;

  @Input()
  drawerMode: 'over' | 'side' = 'side';

  @Input()
  drawerPosition: 'start' | 'end' = 'start';

  currentDrawerMode: 'over' | 'side';

  constructor(
    public layoutService: LayoutService,
    private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    if (this.drawerMode === 'over') {
      this.layoutService.closeMenu();
    }

    this.breakpointObserver
      .observe(['(min-width: 640px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.currentDrawerMode = this.drawerMode;
          this.layoutService.setMobile(false);
        } else {
          this.currentDrawerMode = 'over';
          this.layoutService.setMobile(true);
          this.layoutService.closeMenu();
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.drawerMode) {
      this.currentDrawerMode = this.drawerMode ?? 'side';
    }
  }

  handleNav(): void {
    if (this.layoutService.mobileScreen) {
      this.layoutService.closeMenu();
    }
  }

}

