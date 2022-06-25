// Angular
import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';

@Injectable({
  providedIn: 'root'
})
export class IconRegistryService {

  constructor(private matIconRegistry: MatIconRegistry) {}

  public registerIcons(): void {
    this.matIconRegistry.setDefaultFontSetClass('material-symbols-rounded');
  }
}
