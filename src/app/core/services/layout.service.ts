// Angular
import { Injectable } from '@angular/core';

// rxjs
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private _menuOpen = new BehaviorSubject<boolean>(true);

  private _mobileScreen = new BehaviorSubject<boolean>(false);

  get menuOpen$(): Observable<boolean> {
    return this._menuOpen.asObservable();
  }

  get mobileScreen$(): Observable<boolean> {
    return this._menuOpen.asObservable();
  }

  get mobileScreen(): boolean {
    return this._mobileScreen.value;
  }

  toggleMenu(): void {
    this._menuOpen.next(!this._menuOpen.value);
  }

  closeMenu(): void {
    this._menuOpen.next(false);
  }

  openMenu(): void {
    this._menuOpen.next(true);
  }

  setMobile(isMobile: boolean): void {
    this._mobileScreen.next(isMobile);
  }

}
