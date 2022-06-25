// Angular
import { Injectable } from '@angular/core';

// webstorage
import { LocalStorage, LocalStorageService } from 'ngx-webstorage';

// rxjs
import { Observable } from 'rxjs';

export enum DarkMode {
  Light = 0,
  Dark,
  System
}

@Injectable({
  providedIn: 'root'
})
export class ClientStateService {

  @LocalStorage()
  darkMode: DarkMode;

  constructor(private storage: LocalStorageService) {}

  public get darkMode$(): Observable<DarkMode> {
    return this.storage.observe('darkMode');
  }

  public clear(): void {
    this.storage.clear();
  }

}
