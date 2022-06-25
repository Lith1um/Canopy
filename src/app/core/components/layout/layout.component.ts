// Angular
import { Component, Input, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

// Models
import { NavigationItemModel } from '@shared/models';

// Services
import { LayoutService } from '@core/services';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  @Input()
  navigationItems: NavigationItemModel[];

  @Input()
  menuTitle: string;

  @Input()
  autoCollapseMenu = true;

  drawerMode: 'over' | 'side' = 'side';

  constructor(
    public layoutService: LayoutService,
    private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(min-width: 640px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.drawerMode = 'side';
          this.layoutService.setMobile(false);
        } else {
          this.drawerMode = 'over';
          this.layoutService.setMobile(true);
          this.layoutService.closeMenu();
        }
      });
  }

  handleNav(): void {
    if (this.layoutService.mobileScreen) {
      this.layoutService.closeMenu();
    }
  }

}

