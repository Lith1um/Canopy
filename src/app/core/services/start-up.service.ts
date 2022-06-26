// Angular
import { Injectable } from '@angular/core';

import { ClientStateService, DarkMode } from './client-state.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StartUpService {

  constructor(
    private clientState: ClientStateService,
    private authService: AuthService) {}

  initApp(): Promise<any> {
    return new Promise<void>((resolve) => {
      if (this.clientState.darkMode === null || this.clientState.darkMode === undefined) {
        this.clientState.darkMode = DarkMode.System;
      }
      if (this.authService.isAuthenticated === null || this.authService.isAuthenticated === undefined) {
        this.authService.isAuthenticated = false;
      }
      resolve();
    });
  }

}
