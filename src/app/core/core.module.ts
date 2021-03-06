import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { LoginComponent, MainLayoutComponent } from '@core/components';

@NgModule({
  imports: [SharedModule],
  declarations: [
    LoginComponent,
    MainLayoutComponent
  ],
  exports: [
    LoginComponent,
    MainLayoutComponent
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
