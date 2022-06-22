// Angular
import { Injectable } from '@angular/core';

// Models
import { NavigationItemModel } from '@shared/models';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private _componentRegistry: Map<string, any> = new Map<string, any>();
  private _navigationStore: Map<string, NavigationItemModel[]> = new Map<string, any>();

  /**
   * Register navigation component
   */
  registerComponent(name: string, component: any): void {
    this._componentRegistry.set(name, component);
  }

  /**
   * Deregister navigation component
   */
  deregisterComponent(name: string): void {
    this._componentRegistry.delete(name);
  }

  /**
   * Get navigation component from the registry
   */
  getComponent(name: string): any {
    return this._componentRegistry.get(name);
  }

  /**
   * Store the given navigation with the given key
   */
  storeNavigation(key: string, navigation: NavigationItemModel[]): void {
    // Add to the store
    this._navigationStore.set(key, navigation);
  }

  /**
   * Get navigation from storage by key
   */
  getNavigation(key: string): NavigationItemModel[] {
    return this._navigationStore.get(key) ?? [];
  }

  /**
   * Delete the navigation from the storage
   */
  deleteNavigation(key: string): void {
    // Check if the navigation exists
    if ( !this._navigationStore.has(key) ) {
      console.warn(`Navigation with the key '${key}' does not exist in the store.`);
    }

    // Delete from the storage
    this._navigationStore.delete(key);
  }

  /**
   * Utility function that returns a flattened
   * version of the given navigation array
   */
  getFlatNavigation(
    navigation: NavigationItemModel[],
    flatNavigation: NavigationItemModel[] = []
  ): NavigationItemModel[] {
    for ( const item of navigation ) {
      if ( item.type === 'item' ) {
        flatNavigation.push(item);
        continue;
      }

      if (item.type === 'collapsible' || item.type === 'group' ) {
        if ( item.children ) {
          this.getFlatNavigation(item.children, flatNavigation);
        }
      }
    }
    return flatNavigation;
  }

  /**
   * Utility function that returns the item
   * with the given id from given navigation
   */
  getItem(id: string, navigation: NavigationItemModel[]): NavigationItemModel | null {
    for ( const item of navigation ) {
      if ( item.id === id ) {
        return item;
      }

      if ( item.children ) {
        const childItem = this.getItem(id, item.children);

        if ( childItem ) {
          return childItem;
        }
      }
    }
    return null;
  }

  /**
   * Utility function that returns the item's parent
   * with the given id from given navigation
   */
  getItemParent(
    id: string,
    navigation: NavigationItemModel[],
    parent: NavigationItemModel[] | NavigationItemModel
  ): NavigationItemModel[] | NavigationItemModel | null {
    for ( const item of navigation ) {
      if ( item.id === id ) {
        return parent;
      }

      if ( item.children ) {
        const childItem = this.getItemParent(id, item.children, item);

        if ( childItem ) {
          return childItem;
        }
      }
    }
    return null;
  }
}
