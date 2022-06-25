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
      console.log('startup');
      if (this.clientState.darkMode === null || this.clientState.darkMode === undefined) {
        console.log('no local storage for dark mode');
        this.clientState.darkMode = DarkMode.System;
      }
      resolve();
    });
  }

}
