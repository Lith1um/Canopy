import { Inject, Injectable } from '@angular/core';
import { WINDOW } from '@shared/tokens';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  constructor(@Inject(WINDOW) readonly _windowRef: Window) {}
  
  

}
