import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ClientStateService, DarkMode, IconRegistryService } from '@core/services';
import { WINDOW } from '@shared/tokens';
import { startWith, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private unsubscribe = new Subject<void>();

  constructor(
    @Inject(WINDOW) readonly windowRef: Window,
    @Inject(DOCUMENT) private document: Document,
    private clientState: ClientStateService,
    private iconRegistry: IconRegistryService) {}

  ngOnInit(): void {
    this.iconRegistry.registerIcons();

    this.clientState.darkMode$.pipe(
      takeUntil(this.unsubscribe),
      startWith(this.clientState.darkMode)
    ).subscribe((darkMode: DarkMode) => {
      const prefersDarkMode = this.windowRef.matchMedia('(prefers-color-scheme: dark)').matches;
      // if darkMode is not set, return the system preference
      if (isNaN(darkMode) && prefersDarkMode) {
        this.setDarkMode(true);
        return;
      }

      this.setDarkMode(darkMode === DarkMode.Dark || (darkMode === DarkMode.System && prefersDarkMode));
    });
  }

  setDarkMode(dark: boolean): void {
    if (dark) {
      this.document.body.classList.add('dark');
    } else {
      this.document.body.classList.remove('dark');
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
