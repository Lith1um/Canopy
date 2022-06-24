import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { LayoutComponent, MainLayoutComponent, ToolbarComponent } from '@core/components';

@NgModule({
  imports: [SharedModule],
  declarations: [
    LayoutComponent,
    MainLayoutComponent,
    ToolbarComponent
  ],
  exports: [
    LayoutComponent,
    MainLayoutComponent,
    ToolbarComponent
  ],
  providers: [],
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule
    };
  }

}
