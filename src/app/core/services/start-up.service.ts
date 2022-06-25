// Angular
import { Injectable } from '@angular/core';

import { ClientStateService, DarkMode } from './client-state.service';

@Injectable({
  providedIn: 'root'
})
export class StartUpService {

  constructor(private clientState: ClientStateService) {}

  initApp(): Promise<any> {
    return new Promise<void>((resolve) => {
      if (this.clientState.darkMode === null || this.clientState.darkMode === undefined) {
        this.clientState.darkMode = DarkMode.System;
      }
      resolve();
    });
  }

}
