import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// webstorage
import { LocalStorage, LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @LocalStorage()
  isAuthenticated: boolean;

  constructor(private storage: LocalStorageService) {}

  public get isAuthenticated$(): Observable<boolean> {
    return this.storage.observe('isAuthenticated');
  }

}