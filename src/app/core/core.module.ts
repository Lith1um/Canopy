import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { LayoutComponent, LoginComponent, MainLayoutComponent, ToolbarComponent } from '@core/components';

@NgModule({
  imports: [SharedModule],
  declarations: [
    LayoutComponent,
    LoginComponent,
    MainLayoutComponent,
    ToolbarComponent
  ],
  exports: [
    LayoutComponent,
    LoginComponent,
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
